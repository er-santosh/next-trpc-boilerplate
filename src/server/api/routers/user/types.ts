import type { User } from '@prisma/client';

export type GetUserByIdOptions<T extends boolean> = {
  includeSensitiveInfo?: T;
  bypassCache?: boolean;
};

export type UserWithoutSensitiveInfo = Omit<User, 'password'>;
