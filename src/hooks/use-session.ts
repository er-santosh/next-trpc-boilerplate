import type { BetterFetchError } from 'better-auth/react';

import { authClient, type Session } from '@/lib/auth-client';

interface UseSessionResponse {
  data: Session | null;
  isPending: boolean;
  error: BetterFetchError | null;
  refetch: () => void;
  user?: Session['user'] | null;
  isAuthenticated: boolean;
}

const useSession = (): UseSessionResponse => {
  const session = authClient.useSession();

  const user = session?.data?.user;
  const isAuthenticated = Boolean(session.data);

  return {
    ...session,
    user,
    isAuthenticated,
  };
};

export default useSession;
