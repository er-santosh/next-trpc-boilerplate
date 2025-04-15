/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import createMiddleware from 'next-intl/middleware';
import type { MiddlewareConfig } from 'next/dist/server/web/types';
import { NextResponse, type NextRequest } from 'next/server';

import siteConfig from '@/configs/site-config';

import {
  APP_ROUTES,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT_ROUTE,
  PUBLIC_ROUTES,
} from '@/constants/app-routes';

import { routing } from '@/i18n/routing';

import authConfig from '@/server/auth/config';

const intlMiddleware = createMiddleware(routing);

const { auth } = NextAuth(authConfig);

const testPathnameRegex = (pages: string[], pathName: string): boolean =>
  RegExp(
    `^(/(${siteConfig.locale.locales.join('|')}))?(${pages.flatMap(p => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i'
  ).test(pathName);

const authMiddleware = auth(req => {
  const isLoggedIn = !!req.auth;
  const nextUrl = req.nextUrl;
  const { pathname } = nextUrl;
  const isAuthRoute = testPathnameRegex(AUTH_ROUTES, pathname);

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT_ROUTE, nextUrl));
  }

  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL(APP_ROUTES.AUTH.SIGN_IN, nextUrl));
  }

  return intlMiddleware(req);
});

export default function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;
  const isAuthRoute = testPathnameRegex(AUTH_ROUTES, pathname);
  const isPublicRoute = testPathnameRegex(PUBLIC_ROUTES, pathname);

  if (isAuthRoute) {
    return (authMiddleware as any)(req);
  }

  if (isPublicRoute) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config: MiddlewareConfig = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|api|trpc).*)', '/'],
};
