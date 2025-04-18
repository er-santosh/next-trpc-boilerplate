'use client';

import { useEffect, useRef } from 'react';

import { useSessionStore } from '@/stores/session-store';

import { type MeQueryResult } from '@/server/api/routers/auth/types';

type Props = {
  user: MeQueryResult | null;
};

export const UserStoreInitializer: React.FC<Props> = ({ user }) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      useSessionStore.setState({
        data: user,
        status: user ? 'authenticated' : 'unauthenticated',
      });
    }
  }, [user]);

  return null;
};
