import type { FC, PropsWithChildren } from 'react';

import { NextIntlClientProvider, useLocale, useMessages, useTimeZone } from 'next-intl';

export const LocaleProvider: FC<PropsWithChildren> = ({ children }) => {
  const messages = useMessages();
  const timezone = useTimeZone();
  const locale = useLocale();

  return (
    <NextIntlClientProvider messages={messages} timeZone={timezone} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
};
