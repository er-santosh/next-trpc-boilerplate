import type { PropsWithChildren } from 'react';

import { SessionProvider } from 'next-auth/react';

import { LocaleProvider } from '@/providers/locale-provider';
import NotificationProvider from '@/providers/notification-provider';
import { ThemeProvider } from '@/providers/theme-provider';

import { TRPCReactProvider } from '@/trpc/client';

const AppProvider = ({ children }: PropsWithChildren) => (
  <SessionProvider>
    <TRPCReactProvider>
      <ThemeProvider>
        <LocaleProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </LocaleProvider>
      </ThemeProvider>
    </TRPCReactProvider>
  </SessionProvider>
);

export default AppProvider;
