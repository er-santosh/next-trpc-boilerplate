import { type PropsWithChildren } from 'react';

import AuthCenterLayout from '@/layouts/auth-center-layout';

const layout = ({ children }: PropsWithChildren) => <AuthCenterLayout>{children}</AuthCenterLayout>;

export default layout;
