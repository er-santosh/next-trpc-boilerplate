import type { LoginInputType } from '@/server/api/routers/auth/input';

import type { UserSchemaType } from '@/db/models/schema';

export type MeQueryResult = {
  user: ServerSession['user'];
};
export type ServerSession = {
  user: UserSchemaType;
  sessionToken: string;
};

export type AddUserSessionArgs = {
  userId: UserSchemaType['id'];
  sessionToken: string;
  expiresIn: number;
};

export type DeleteSessionTokenArgs = {
  userId: UserSchemaType['id'];
  sessionToken: string;
};

export type LogoutArgs = {
  headers: Headers;
  session: ServerSession;
};

export type ValidateSessionTokenArgs = {
  encodedSessionToken: string;
  userId: UserSchemaType['id'];
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
  userId: UserSchemaType['id'];
};

export type LoginArgs = {
  input: LoginInputType;
  headers: Headers;
};
