import { api } from '@/trpc/server';

import type { MeQueryResult } from '@/server/api/routers/auth/types';

export const getMe = async (): Promise<MeQueryResult | null> => {
  try {
    return await api.auth.me();
  } catch {
    return null;
  }
};
