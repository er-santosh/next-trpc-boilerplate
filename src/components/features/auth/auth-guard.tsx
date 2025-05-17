'use client';

import { useCallback, useEffect, type PropsWithChildren } from 'react';

import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

import Loader from '@/components/ui/loader';

import { APP_ROUTES, AUTH_ROUTES, DEFAULT_LOGIN_REDIRECT_ROUTE } from '@/constants/app-routes';

import { usePathname, useRouter } from '@/i18n/navigation';

export const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isAuthRoute = useCallback(() => AUTH_ROUTES.includes(pathname), [pathname]);

  useEffect(() => {
    if (session.status === 'authenticated' && isAuthRoute()) {
      router.push(DEFAULT_LOGIN_REDIRECT_ROUTE);
    }

    if (session.status === 'unauthenticated' && !isAuthRoute()) {
      router.push(`${APP_ROUTES.AUTH.SIGN_IN}?${searchParams.toString()}`);
    }
  }, [session.status, pathname, router, searchParams, isAuthRoute]);

  if (session.status === 'loading' || (session.status === 'unauthenticated' && !isAuthRoute())) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return children;
};
