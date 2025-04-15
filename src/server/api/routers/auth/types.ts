import type { LoginInputType, RegisterInputType } from '@/schemas/auth';

import type { UserWithoutSensitiveInfo } from '@/server/api/routers/user/types';

export type MeQueryResult = {
  user: UserWithoutSensitiveInfo;
};

export type LoginArgs = {
  input: LoginInputType;
  headers?: Headers;
};

export type LoginReturn = {
  user: UserWithoutSensitiveInfo;
  message: string;
};

export type RegisterArgs = {
  input: RegisterInputType;
  headers: Headers;
};

export type RegisterReturn = {
  user: UserWithoutSensitiveInfo;
  message: string;
};
