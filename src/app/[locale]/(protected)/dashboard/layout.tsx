import { type PropsWithChildren } from 'react';

import ProtectedLayout from '@/layouts/protected-layout';

const layout = ({ children }: PropsWithChildren) => <ProtectedLayout>{children}</ProtectedLayout>;

export default layout;
