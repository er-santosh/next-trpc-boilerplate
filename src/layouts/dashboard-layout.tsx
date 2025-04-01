import { type PropsWithChildren } from 'react';

import DashboardNavbar from '@/components/containers/navbar/dashboard-navbar';

const DashboardLayout = ({ children }: PropsWithChildren) => (
  <div className="w-full text-gray-700 antialiased">
    <div className="container mx-auto">
      <DashboardNavbar />
    </div>
    <main>{children}</main>
  </div>
);

export default DashboardLayout;
