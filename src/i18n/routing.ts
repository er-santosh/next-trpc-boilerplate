import { defineRouting } from 'next-intl/routing';

import { siteConfig } from '@/config/app-config';

export const routing = defineRouting({
  locales: siteConfig.locale.locales,
  defaultLocale: siteConfig.locale.defaultLocale,
  localePrefix: siteConfig.locale.localePrefix,
});
