'use client';

import { AccountHeader } from '@/components/features/dashboard/account/account-header';
import { AccountInfo } from '@/components/features/dashboard/account/account-info';

import useSession from '@/hooks/use-session';

export default function AccountPage() {
  const { user } = useSession();

  return (
    <div className="flex flex-1 flex-col gap-6">
      <AccountHeader user={user} />
      <AccountInfo user={user} />
    </div>
  );
}
