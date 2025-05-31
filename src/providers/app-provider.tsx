import type { PropsWithChildren } from 'react';

import { LocaleProvider } from '@/providers/locale-provider';
import NotificationProvider from '@/providers/notification-provider';
import { ThemeProvider } from '@/providers/theme-provider';

import { TRPCReactProvider } from '@/trpc/client';

const AppProvider = ({ children }: PropsWithChildren) => (
  <>
    <TRPCReactProvider>
      <ThemeProvider>
        <LocaleProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </LocaleProvider>
      </ThemeProvider>
    </TRPCReactProvider>
  </>
);

export default AppProvider;
