import { type PropsWithChildren } from 'react';

import { AuthGuard } from '@/components/features/auth/auth-guard';

const layout = ({ children }: PropsWithChildren) => <AuthGuard>{children}</AuthGuard>;

export default layout;
