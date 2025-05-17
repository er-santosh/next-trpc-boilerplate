import { type PropsWithChildren } from 'react';

import DashboardNavbar from '@/components/containers/navbar/dashboard-navbar';

const DashboardLayout = ({ children }: PropsWithChildren) => (
  <div className="w-full text-gray-700 antialiased container mx-auto px-4 md:px-0">
    <div>
      <DashboardNavbar />
    </div>
    <main>{children}</main>
  </div>
);

export default DashboardLayout;
