import type { Prisma, User } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { Logger } from '@/server/api/common/logger';
import {
  type GetUserByIdOptions,
  type UserWithoutSensitiveInfo,
} from '@/server/api/routers/user/types';

import { db } from '@/db';

class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  public async getUserById<T extends boolean = false>(
    id: User['id'],
    options?: GetUserByIdOptions<T>
  ): Promise<User | UserWithoutSensitiveInfo | null> {
    const { includeSensitiveInfo = false } = options ?? {};

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
