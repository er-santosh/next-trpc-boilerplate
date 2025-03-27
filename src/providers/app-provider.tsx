import type { PropsWithChildren } from 'react';

import { LocaleProvider } from '@/providers/locale-provider';

const AppProvider = ({ children }: PropsWithChildren) => (
  <LocaleProvider>{children}</LocaleProvider>
);

export default AppProvider;
