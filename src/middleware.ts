import { type NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';
import type { NextMiddlewareResult } from 'next/dist/server/web/types';
import { type NextFetchEvent } from 'next/server';

import { createRouteMatcher } from '@/utils/route-matcher';

import { routing } from '@/i18n/routing';

const intlMiddleware = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher(['/dashboard*', '/:locale/dashboard*']);

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: async ({ token }) =>
        // If a user is authenticated, the token will be present
        // and the user is authorized.
        !!token?.id,
    },
  }
);

export default function middleware(
  request: NextRequestWithAuth,
  event: NextFetchEvent
): NextMiddlewareResult {
  if (isProtectedRoute(request)) return authMiddleware(request, event) as NextMiddlewareResult;

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|api|trpc).*)', '/'],
};
