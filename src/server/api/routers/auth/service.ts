/* eslint-disable @typescript-eslint/no-explicit-any */
import { TRPCError } from '@trpc/server';
import argon2 from 'argon2';
import { and, eq } from 'drizzle-orm';

import { TimeInSeconds } from '@/server/api/common/enums/time-in-seconds-enum';
import { createSecureCookie, deleteCookie } from '@/server/api/common/utils/cookie-management';
import {
  type AddUserSessionArgs,
  type DeleteSessionTokenArgs,
  type LoginArgs,
  type LogoutAllSessionsArgs,
  type LogoutArgs,
  type ServerSession,
  type ValidateSessionTokenArgs,
  type ValidateSessionTokenResult,
} from '@/server/api/routers/auth/types';
import { userRepository } from '@/server/api/routers/user/repository';

import { db } from '@/db';
import type { UserSchemaType } from '@/db/models/schema';
import { UserSchema } from '@/db/models/schema';
import { redis } from '@/db/redis';

export const SESSION_TOKEN_COOKIE_KEY = 'x-session-token';
export const USER_ID_COOKIE_KEY = 'x-user-id';

export const SESSION_TOKENS_PREFIX = 'session-tokens:';
export function getSessionTokensKey(userId: UserSchemaType['id']): string {
  return `${SESSION_TOKENS_PREFIX}${userId}`;
}

class AuthService {
  public getSessionTokensKey(userId: UserSchemaType['id']): string {
    return `${SESSION_TOKENS_PREFIX}${userId}`;
  }

  private async addUserSession(args: AddUserSessionArgs): Promise<void> {
    const sessionKey = this.getSessionTokensKey(args.userId);
    const score = Math.floor(Date.now() / 1000) + args.expiresIn; // Current time + expiration time in seconds

    const pipeline = redis.multi();

    pipeline.zadd(sessionKey, score.toString(), args.sessionToken);
    pipeline.zcount(sessionKey, '-inf', '+inf');
    pipeline.expire(sessionKey, args.expiresIn);

    const results = await pipeline.exec();
    const sessionTokensCount = results?.[1]?.[1];

    if (
      !Array.isArray(results) ||
      results.some(result => (result as any)[0] !== null) ||
      typeof sessionTokensCount !== 'number'
    ) {
      // TODO: Logging
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to add user session',
      });
    }

    const SESSIONS_TOKEN_LIMIT = 8;

    if (sessionTokensCount > SESSIONS_TOKEN_LIMIT) {
      const tokensToRemove = sessionTokensCount - 8;

      pipeline.zremrangebyrank(sessionKey, 0, tokensToRemove - 1);
    }

    await pipeline.exec();
  }

  private async deleteSessionToken(args: DeleteSessionTokenArgs): Promise<void> {
    const sessionKey = this.getSessionTokensKey(args.userId);

    await redis.zrem(sessionKey, args.sessionToken);
  }

  async checkSessionTokenValidity(
    userId: UserSchemaType['id'],
    sessionToken: string
  ): Promise<boolean> {
    const sessionKey = this.getSessionTokensKey(userId);
    const score = await redis.zscore(sessionKey, sessionToken);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (score !== null && parseInt(score, 10) > currentTimestamp) {
      return true;
    }

    await redis.zrem(sessionKey, sessionToken);

    return false;
  }

  private async isTokenAboutToExpire(
    userId: UserSchemaType['id'],
    decodedSessionToken: string
  ): Promise<boolean> {
    const sessionKey = this.getSessionTokensKey(userId);
    const score = await redis.zscore(sessionKey, decodedSessionToken);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    return score !== null && parseInt(score, 10) - currentTimestamp < TimeInSeconds.OneWeek;
  }

  private async renewSessionTokenAndCookies(
    userId: UserSchemaType['id'],
    headers: Headers
  ): Promise<string> {
    const expiresIn = 60 * 60 * 24 * 5; // Renew for another 5 days
    const newSessionToken = await this.generateSessionToken(userId);

    await this.addUserSession({
      userId,
      sessionToken: newSessionToken,
      expiresIn,
    });

    createSecureCookie({
      headers,
      expiresInSeconds: expiresIn,
      name: SESSION_TOKEN_COOKIE_KEY,
      value: encodeURIComponent(newSessionToken),
    });

    return newSessionToken;
  }

  private async generateSessionToken(userId: ServerSession['user']['id']): Promise<string> {
    const rawToken = `${userId}-${Date.now()}-${Math.random()}`;
    const hashedToken = await argon2.hash(rawToken);

    return hashedToken;
  }

  verifyAccessToken(_accessToken: string): Promise<ServerSession['user']> {
    throw new Error('Method not implemented.');
  }

  async verifyCredentials(credentials: LoginArgs['input']['credentials']): Promise<{
    id: string;
    username: string;
  }> {
    const users = await db
      .select({
        id: UserSchema.id,
        username: UserSchema.username,
      })
      .from(UserSchema)
      .where(
        and(
          eq(UserSchema.username, credentials.username),
          eq(UserSchema.password, Buffer.from(credentials.password).toString('base64'))
        )
      );

    const foundUser = users[0];

    if (foundUser) return foundUser;

    const result: UserSchemaType = {
      id: '1',
      username: credentials.username,
      password: credentials.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return result;
  }

  public async login(args: LoginArgs): Promise<ServerSession> {
    const {
      input: { credentials },
      headers,
    } = args;

    try {
      const verifiedUser = await this.verifyCredentials(credentials);

      const { username } = verifiedUser;
      const password = Buffer.from(credentials.password).toString('base64');

      if (!username || !password) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });
      }
      const userInfo = await userRepository.upsertUser({
        onCreate: {
          username,
          password,
        },
        onUpdate: {
          username,
          password,
        },
      });

      if (userInfo === null) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to login',
        });
      }

      const expiresIn = TimeInSeconds.TwoWeeks;
      const sessionToken = await this.generateSessionToken(userInfo.id);

      await this.addUserSession({
        userId: userInfo.id,
        sessionToken,
        expiresIn,
      });

      createSecureCookie({
        headers,
        expiresInSeconds: expiresIn,
        name: SESSION_TOKEN_COOKIE_KEY,
        value: encodeURIComponent(sessionToken),
      });

      createSecureCookie({
        headers,
        expiresInSeconds: expiresIn,
        name: USER_ID_COOKIE_KEY,
        value: `${userInfo.id}`,
      });

      return {
        user: userInfo,
        sessionToken,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: error.message,
        });
      }
      if (error instanceof TRPCError) throw error;
      // TODO: Logging
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to login',
      });
    }
  }

  public async logout(args: LogoutArgs): Promise<void> {
    await this.deleteSessionToken({
      userId: args.session.user.id,
      sessionToken: args.session.sessionToken,
    });

    deleteCookie({
      headers: args.headers,
      name: SESSION_TOKEN_COOKIE_KEY,
    });

    deleteCookie({
      headers: args.headers,
      name: USER_ID_COOKIE_KEY,
    });
  }

  public async validateSessionToken(
    args: ValidateSessionTokenArgs
  ): Promise<ValidateSessionTokenResult> {
    if (!args.validateSessionToken) {
      return {
        success: true,
        userInfo: await userRepository.getUserById(args.userId, {
          includeSensitiveInfo: true,
        }),
        sessionToken: args.encodedSessionToken,
      };
    }

    const decodedSessionToken = decodeURIComponent(args.encodedSessionToken);
    const isSessionTokenValid = await this.checkSessionTokenValidity(
      args.userId,
      decodedSessionToken
    );

    if (!isSessionTokenValid) {
      return {
        success: false,
      };
    }

    let finalSessionToken = decodedSessionToken;

    if (await this.isTokenAboutToExpire(args.userId, decodedSessionToken)) {
      finalSessionToken = await this.renewSessionTokenAndCookies(args.userId, args.headers);
    }

    return {
      success: true,
      userInfo: await userRepository.getUserById(args.userId, {
        includeSensitiveInfo: true,
      }),
      sessionToken: finalSessionToken,
    };
  }

  public async removeAllSessions(args: LogoutAllSessionsArgs): Promise<void> {
    const sessionKey = this.getSessionTokensKey(args.userId);

    await redis.del(sessionKey);

    deleteCookie({
      name: SESSION_TOKEN_COOKIE_KEY,
      headers: args.headers,
    });

    deleteCookie({
      name: USER_ID_COOKIE_KEY,
      headers: args.headers,
    });
  }
}

export const authService = new AuthService();
