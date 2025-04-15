import type { User } from '@prisma/client';

export type GetUserByIdOptions<T extends boolean> = {
  includeSensitiveInfo?: T;
};

export type UserWithoutSensitiveInfo = Omit<User, 'password'>;
