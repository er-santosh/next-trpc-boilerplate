import type { PropsWithChildren } from 'react';

import { Toaster } from 'react-hot-toast';

const NotificationProvider = ({ children }: PropsWithChildren) => (
  <>
    <Toaster />
    {children}
  </>
);

export default NotificationProvider;
