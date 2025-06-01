import createMiddleware from 'next-intl/middleware';
import type { MiddlewareConfig } from 'next/dist/server/web/types';
import { NextResponse, type NextRequest } from 'next/server';

import { getSessionCookie } from 'better-auth/cookies';

import siteConfig from '@/configs/site-config';

import {
  APP_ROUTES,
  AUTH_ROUTES,
  DEFAULT_AUTHENTICATED_REDIRECT_ROUTE,
  PUBLIC_ROUTES,
} from '@/constants/app-routes';
import { COOKIES } from '@/constants/cookies';

import { routing } from '@/i18n/routing';

const intlMiddleware = createMiddleware(routing);

const testPathnameRegex = (pages: string[], pathName: string): boolean =>
  RegExp(
    `^(/(${siteConfig.locale.locales.join('|')}))?(${pages.flatMap(p => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i'
  ).test(pathName);

export default function middleware(req: NextRequest): NextResponse {
  const sessionCookie = getSessionCookie(req, {
    cookiePrefix: COOKIES.SESSION_TOKEN_PREFIX,
  });

  const isLoggedIn = !!sessionCookie;
  const nextUrl = req.nextUrl;
  const { pathname } = nextUrl;
  const isAuthRoute = testPathnameRegex(AUTH_ROUTES, pathname);
  const isPublicRoute = testPathnameRegex(PUBLIC_ROUTES, pathname);

  if (isPublicRoute) {
    return intlMiddleware(req);
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_AUTHENTICATED_REDIRECT_ROUTE, nextUrl));
  }

  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL(APP_ROUTES.AUTH.SIGN_IN, nextUrl));
  }

  return intlMiddleware(req);
}

export const config: MiddlewareConfig = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|api|trpc).*)', '/'],
};
