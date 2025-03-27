import type { PropsWithChildren } from 'react';

import { LocaleProvider } from '@/providers/locale-provider';
import { ThemeProvider } from '@/providers/theme-provider';

const AppProvider = ({ children }: PropsWithChildren) => (
  <ThemeProvider>
    <LocaleProvider>{children}</LocaleProvider>
  </ThemeProvider>
);

export default AppProvider;
