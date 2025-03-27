import type { LocalePrefixMode } from 'next-intl/routing';

export interface TwitterConfig {
  username: string;
  card: 'summary' | 'summary_large_image' | 'player' | 'app' | undefined;
  img: string;
  imgAlt: string;
  title: 'summary' | 'summary_large_image' | 'player' | 'app' | undefined;
}

export interface OGConfig {
  imgType: string;
  imgWidth: string;
  imgHeight: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  featuredImage: string;
  favicon: string;
  lightAccentColor: string;
  darkAccentColor: string;
  og: OGConfig;
  twitter: TwitterConfig;
  locale: {
    locales: string[];
    defaultLocale: string;
    localePrefix: LocalePrefixMode;
    timeZone: string;
  };
  github: {
    repoLink: string;
  };
}
