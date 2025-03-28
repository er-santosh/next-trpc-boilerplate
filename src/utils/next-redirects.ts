/* eslint-disable @typescript-eslint/no-explicit-any */
import { NEXT_REDIRECTS } from '../constants/next-redirects';
import { availableLocaleCodes } from '../i18n/locales';

// it would also match /about/security (without any language prefix)
const localesMatch = `/:locale(${availableLocaleCodes.join('|')}|)?`;

/**
 * These are external redirects that happen before we check dynamic routes and rewrites
 * These are sourced originally from https://github.com/nodejs/build/blob/main/ansible/www-standalone/resources/config/nodejs.org?plain=1
 * and were then converted to Next.js rewrites. Note that only relevant rewrites were added, and some were modified to match Next.js's syntax
 *
 */
const redirects = async (): Promise<
  {
    source: string;
    permanent: boolean;
    destination: string;
  }[]
> =>
  NEXT_REDIRECTS.externals.map(({ source, destination }) => ({
    source: source.replace('/:locale', localesMatch),
    // We prevent permanent redirects as in general the redirects are safeguards
    // of legacy or old pages or pages that moved, and in general we don't want permanent redirects
    permanent: false,
    destination,
  }));

/**
 * These are rewrites that happen before we check dynamic routes and after we check regular redirects
 * These should be used either for internal or external rewrite rules (like NGINX, for example)
 * These are sourced originally from https://github.com/nodejs/build/blob/main/ansible/www-standalone/resources/config/nodejs.org?plain=1
 * and were then converted to Next.js rewrites. Note that only relevant rewrites were added, and some were modified to match Next.js's syntax
 *
 */
const rewrites = async (): Promise<{
  afterFiles: {
    source: any;
    destination: never;
  }[];
  beforeFiles: never[];
  fallback: never[];
}> => {
  const mappedRewrites = NEXT_REDIRECTS.internals.map(({ source, destination }) => ({
    source: (source as string).replace('/:locale', localesMatch),
    destination,
  }));

  const { fallback, beforeFiles, afterFiles: localAfterFiles } = NEXT_REDIRECTS.rewrites;
  const afterFiles = [...mappedRewrites, ...localAfterFiles];

  return { afterFiles, beforeFiles, fallback };
};

export { redirects, rewrites };
