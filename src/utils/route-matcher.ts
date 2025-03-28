import type { NextRequest } from 'next/server';

type RoutePattern = string | RegExp | ((_req: NextRequest) => boolean);

export const createRouteMatcher = (patterns: RoutePattern | RoutePattern[]) => {
  const patternList = Array.isArray(patterns) ? patterns : [patterns];

  return (req: NextRequest) => {
    const pathname = req.nextUrl.pathname;

    return patternList.some(pattern => {
      if (typeof pattern === 'function') {
        return pattern(req);
      }

      if (pattern instanceof RegExp) {
        return pattern.test(pathname);
      }

      // Convert Next.js route pattern to regex
      let regexPattern = pattern
        .replace(/\*/g, '.*') // Convert * to .*
        .replace(/\/$/, '(/|$)'); // Handle trailing slashes

      // Handle locale prefixes if pattern starts with /:locale
      if (regexPattern.startsWith('/:locale')) {
        regexPattern = `(/${req.nextUrl.locale}|/[a-z]{2})${regexPattern.slice(8)}`;
      }

      // Create case-insensitive regex
      return new RegExp(`^${regexPattern}$`, 'i').test(pathname);
    });
  };
};
