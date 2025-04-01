import type { Prisma, User } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { Logger } from '@/server/api/common/logger';
import { type ServerSession } from '@/server/api/routers/auth/types';
import {
  type GetUserByIdOptions,
  type UserWithoutSensitiveInfo,
} from '@/server/api/routers/user/types';

import { db } from '@/db';
import { redis } from '@/db/redis';

class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  private getUserInfoKey(userId: User['id']): string {
    return `user-info:${userId}`;
  }

  private async cacheUserInfo(user: ServerSession['user']): Promise<void> {
    const userKey = this.getUserInfoKey(user.id);

    await redis.set(
      userKey,
      JSON.stringify(user),
      'EX',
      60 * 60 * 24 * 7 // 7 days in seconds
    );
  }

  private async getCachedUserInfo(
    userId: ServerSession['user']['id']
  ): Promise<ServerSession['user'] | null> {
    const userKey = this.getUserInfoKey(userId);
    const cachedUserInfo = await redis.get(userKey);

    return cachedUserInfo !== null ? (JSON.parse(cachedUserInfo) as ServerSession['user']) : null;
  }

  public async getUserById<T extends boolean = false>(
    id: User['id'],
    options?: GetUserByIdOptions<T>
  ): Promise<User | UserWithoutSensitiveInfo | null> {
    const { includeSensitiveInfo = false, bypassCache = false } = options ?? {};

    if (!bypassCache) {
      const cachedUserInfo = await this.getCachedUserInfo(id);

      if (cachedUserInfo !== null) {
        if (includeSensitiveInfo) return cachedUserInfo;

        return {
          ...cachedUserInfo,
          password: undefined,
        };
      }
    }

    const result = await db.user.findUnique({
      where: {
        id,
      },
      omit: {
        ...(includeSensitiveInfo
          ? {}
          : {
              password: false,
            }),
      },
    });

    if (result) {
      this.cacheUserInfo(result);
    }

    return result;
  }

  public async getUserByIdOrThrow<T extends boolean = false>(
    id: User['id'],
    options?: GetUserByIdOptions<T>
  ): Promise<UserWithoutSensitiveInfo> {
    const user = await this.getUserById(id, options);

    if (user === null) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      });
    }

    return user;
  }

  public async createUser(data: Prisma.UserCreateInput): Promise<User | null> {
    try {
      const result = await db.user.create({
        data,
      });

      this.logger.info('Created user', result);

      if (result !== undefined) {
        this.cacheUserInfo(result);
      }

      return result ?? null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error('Failed to create user', error);
      } else {
        this.logger.error('Failed to create user');
      }

      return null;
    }
  }
}

export const userRepository = new UserRepository();
