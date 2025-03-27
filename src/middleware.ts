import createMiddleware from 'next-intl/middleware';
import { type NextRequest, type NextResponse } from 'next/server';

import { routing } from '@/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest): NextResponse {
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|api|trpc).*)', '/'],
};
