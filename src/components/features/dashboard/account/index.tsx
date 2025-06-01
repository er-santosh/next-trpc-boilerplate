'use client';

import { AccountHeader } from '@/components/features/dashboard/account/account-header';
import { AccountInfo } from '@/components/features/dashboard/account/account-info';

import useSession from '@/hooks/use-session';

export default function Account() {
  const { user } = useSession();

  return (
    <>
      <AccountHeader user={user} />
      <AccountInfo user={user} />
    </>
  );
}
