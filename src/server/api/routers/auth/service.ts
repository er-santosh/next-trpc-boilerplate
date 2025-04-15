import type { Account, User } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import bcryptjs from 'bcryptjs';

import type {
  LoginArgs,
  LoginReturn,
  RegisterArgs,
  RegisterReturn,
} from '@/server/api/routers/auth/types';
import { userRepository } from '@/server/api/routers/user/repository';

import { db } from '@/db';

export const SESSION_TOKEN_COOKIE_KEY = 'x-session-token';
export const USER_ID_COOKIE_KEY = 'x-user-id';

export const SESSION_TOKENS_PREFIX = 'session-tokens:';
export function getSessionTokensKey(userId: User['id']): string {
  return `${SESSION_TOKENS_PREFIX}${userId}`;
}

class AuthService {
  async getActiveUser(email: string): Promise<(User & { accounts: Account[] }) | null> {
    const foundUser = await db.user.findFirst({
      where: {
        email,
        is_active: true,
      },
      include: {
        accounts: true,
      },
    });

    return foundUser;
  }

  async hashPassword(password: string): Promise<string> {
    return await bcryptjs.hash(password, 10);
  }

  async verifyPassword(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcryptjs.compare(rawPassword, hashedPassword);
  }

  public async register(args: RegisterArgs): Promise<RegisterReturn> {
    const { input: credentials } = args;

    try {
      const activeUser = await this.getActiveUser(credentials.email);

      if (activeUser) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User already exists.',
        });
      }

      const newUser = await userRepository.createUser({
        ...args.input,
        password: await this.hashPassword(args.input.password),
      });

      if (!newUser) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create user',
        });
      }

      const { password: _, ...other } = newUser;

      return {
        user: other,
        message: 'User registered successfully',
      };
    } catch (error: unknown) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to register user',
      });
    }
  }

  public async login(args: LoginArgs): Promise<LoginReturn> {
    const { input: credentials } = args;

    try {
      const activeUser = await this.getActiveUser(credentials.email);

      if (!activeUser) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });
      }

      if (
        !activeUser.password ||
        !(await this.verifyPassword(credentials.password, activeUser.password))
      ) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });
      }

      return { user: activeUser, message: 'Login successful' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: error.message,
        });
      }
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to login',
      });
    }
  }
}

export const authService = new AuthService();
