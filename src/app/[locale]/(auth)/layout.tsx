import type { PropsWithChildren } from 'react';

import { AuthGuard } from '@/components/features/auth/auth-guard';
import { UserStoreInitializer } from '@/components/features/auth/user-store-initializer';

import { getMe } from '@/server/helpers';

const AuthLayout = async ({ children }: PropsWithChildren) => {
  const user = await getMe();

  return (
    <>
      <UserStoreInitializer user={user} />
      <AuthGuard>{children}</AuthGuard>
    </>
  );
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default AuthLayout;
