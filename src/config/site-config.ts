import { availableLocaleCodes, defaultLocale, localePrefix } from '@/i18n/locales';

import type { SiteConfig } from '@/types/config';

const site: SiteConfig = {
  title: 'Next15 boilerplate with Next Auth and Next Intl',
  description:
    'Next15 is a Starter Next.js boilerplate with NextAuth, i18n, TRPC, Tailwind CSS, and Internationalization support.',
  featuredImage: '/static/images/next.svg',
  favicon: '/static/favicons/favicon.ico',
  github: {
    repoLink: 'https://github.com/er-santosh/next-trpc-boilerplate',
  },
  locale: {
    locales: availableLocaleCodes,
    defaultLocale: defaultLocale.code,
    localePrefix,
    timeZone: 'Etc/UTC',
  },
  lightAccentColor: '#333',
  darkAccentColor: '#333',
  twitter: {
    username: '@next14',
    card: 'summary',
    img: '/static/images/next.svg',
    imgAlt: 'The Next15 Logo',
    title: 'summary',
  },
  og: {
    imgType: '/static/images/next.svg',
    imgHeight: '630',
    imgWidth: '1200',
  },
};

export default site;
