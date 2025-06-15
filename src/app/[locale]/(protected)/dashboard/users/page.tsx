import ClientBoundary from '@/components/common/client-boundary';
import UsersView from '@/components/features/dashboard/users/users-view';

import { trpc } from '@/trpc/server';

const UsersPage = () => {
  // direct server data fetch
  // const users = await trpc.users.getUsers();

  // prefetch query
  void trpc.users.getUsers.prefetch();

  return (
    <ClientBoundary>
      <UsersView />
    </ClientBoundary>
  );
};

export default UsersPage;
