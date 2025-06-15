'use client';

import { api } from '@/trpc/client';

const UsersView = () => {
  const [data] = api.users.getUsers.useSuspenseQuery();

  return <code>{JSON.stringify(data)}</code>;
};

export default UsersView;
