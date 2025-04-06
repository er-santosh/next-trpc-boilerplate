import createMiddleware from 'next-intl/middleware';
import type { NextMiddlewareResult } from 'next/dist/server/web/types';
import { type NextRequest } from 'next/server';

// import { APP_ROUTES } from '@/constants/app-routes';

// import { createRouteMatcher } from '@/utils/route-matcher';

import { routing } from '@/i18n/routing';

const intlMiddleware = createMiddleware(routing);

// const isProtectedRoute = createRouteMatcher([
//   `/${APP_ROUTES.DASHBOARD}*`,
//   `/:locale/${APP_ROUTES.DASHBOARD}*`,
// ]);

export default function middleware(request: NextRequest): NextMiddlewareResult {
  // if (isProtectedRoute(request)) return ;

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|api|trpc).*)', '/'],
};
