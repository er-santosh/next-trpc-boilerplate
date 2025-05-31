import createMiddleware from 'next-intl/middleware';
import type { MiddlewareConfig } from 'next/dist/server/web/types';
import type { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

import { routing } from '@/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest): NextResponse {
  return intlMiddleware(req);
}

export const config: MiddlewareConfig = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|api|trpc).*)', '/'],
};
