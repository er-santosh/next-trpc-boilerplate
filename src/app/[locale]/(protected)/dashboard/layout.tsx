import { type PropsWithChildren } from 'react';

import ProtectedLayout from '@/layouts/protected-layout';

import { AuthGuard } from '@/components/features/auth/auth-guard';

const layout = ({ children }: PropsWithChildren) => (
  <AuthGuard>
    <ProtectedLayout>{children}</ProtectedLayout>
  </AuthGuard>
);

export default layout;
