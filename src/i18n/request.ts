/* eslint-disable @typescript-eslint/no-explicit-any */
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { siteConfig } from '@/config/app-config';

import { routing } from '@/i18n/routing';

const loadLocaleDictionary = async (locale: string): Promise<any> => {
  if (locale === 'en') {
    return import('../../messages/en.json').then(f => f.default);
  }

  if (siteConfig.locale.locales.includes(locale)) {
    return import(`../../messages/${locale}.json`).then(f => f.default);
  }

  throw new Error(`Unsupported locale: ${locale}`);
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    messages: await loadLocaleDictionary(locale),
    timeZone: siteConfig.locale.timeZone,
    locale,
  };
});
