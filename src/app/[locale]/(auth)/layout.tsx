import type { PropsWithChildren } from 'react';

import { AuthGuard } from '@/components/features/auth/auth-guard';

const AuthLayout = ({ children }: PropsWithChildren) => <AuthGuard>{children}</AuthGuard>;

export default AuthLayout;
