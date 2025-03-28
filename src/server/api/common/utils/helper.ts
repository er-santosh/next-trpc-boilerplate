import { cookies } from 'next/headers';

import { SESSION_TOKEN_COOKIE_KEY, USER_ID_COOKIE_KEY } from '@/server/api/routers/auth/service';
import type { TRPCContext } from '@/server/api/trpc';

export const getUserIdFromAuthToken = async (
  ctx: TRPCContext
): Promise<{
  encodedSessionToken: string | null;
  userId: string | null;
  validateSessionToken: boolean;
}> => {
  const { token } = ctx;

  if (token) {
    return {
      encodedSessionToken: encodeURIComponent(token.sessionToken || ''),
      userId: token.id,
      validateSessionToken: false,
    };
  }

  const encodedSessionToken = (await cookies()).get(SESSION_TOKEN_COOKIE_KEY)?.value || null;
  const userId = (await cookies()).get(USER_ID_COOKIE_KEY)?.value || null;

  return {
    encodedSessionToken,
    userId,
    validateSessionToken: true,
  };
};
