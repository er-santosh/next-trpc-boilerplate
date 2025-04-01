import type { User } from '@prisma/client';

import type { LoginInputType, RegisterInputType } from '@/schemas/auth';

import type { UserWithoutSensitiveInfo } from '@/server/api/routers/user/types';

export type MeQueryResult = {
  user: ServerSession['user'];
};
export type ServerSession = {
  user: UserWithoutSensitiveInfo;
  sessionToken: string;
};

export type AddUserSessionArgs = {
  userId: User['id'];
  sessionToken: string;
  expiresIn: number;
};

export type DeleteSessionTokenArgs = {
  userId: User['id'];
  sessionToken: string;
};

export type LogoutArgs = {
  headers: Headers;
  session: ServerSession;
};

export type ValidateSessionTokenArgs = {
  encodedSessionToken: string;
  userId: User['id'];
  headers: Headers;
  validateSessionToken?: boolean;
};
export type ValidateSessionTokenResult =
  | {
      success: true;
      userInfo: ServerSession['user'] | null;
      sessionToken: string;
    }
  | {
      success: false;
    };

export type ValidateUserSessionResult =
  | {
      success: true;
      userInfo: ServerSession['user'] | null;
    }
  | {
      success: false;
    };

export type LogoutAllSessionsArgs = {
  headers: Headers;
  userId: User['id'];
};

export type LoginArgs = {
  input: LoginInputType;
  headers: Headers;
};

export type RegisterArgs = {
  input: RegisterInputType;
  headers: Headers;
};

export type RegisterReturn = {
  user: UserWithoutSensitiveInfo;
  message: string;
};
