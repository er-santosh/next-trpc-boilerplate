import type { PropsWithChildren } from 'react';

import DashboardNavbar from '@/components/containers/navbar/dashboard-navbar';

const ProtectedLayout = ({ children }: PropsWithChildren) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    <div className="mx-auto grid size-full max-w-screen-lg grid-cols-[1fr] grid-rows-[auto_1fr_auto]">
      <DashboardNavbar />
      <main>{children}</main>
    </div>
  </div>
);

export default ProtectedLayout;
