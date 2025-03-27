import type { PropsWithChildren } from 'react';

import DashboardLayout from '@/layouts/dashboard-layout';

const layout = ({ children }: PropsWithChildren) => <DashboardLayout>{children}</DashboardLayout>;

export default layout;
