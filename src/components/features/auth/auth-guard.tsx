'use client';

import { useEffect, type PropsWithChildren } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import Loader from '@/components/ui/loader';

import {
  APP_ROUTES,
  AUTH_ROUTES,
  DEFAULT_AUTHENTICATED_REDIRECT_ROUTE,
} from '@/constants/app-routes';

import useSession from '@/hooks/use-session';

import { useRouter } from '@/i18n/navigation';

export const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  useEffect(() => {
    if (session.isPending) {
      return;
    }

    if (session.isAuthenticated && isAuthRoute) {
      router.push(DEFAULT_AUTHENTICATED_REDIRECT_ROUTE);

      return;
    }

    if (!session.isAuthenticated && !isAuthRoute) {
      router.push(`${APP_ROUTES.AUTH.SIGN_IN}?${searchParams.toString()}`);

      return;
    }
  }, [session.isAuthenticated, session.isPending, pathname, router, searchParams, isAuthRoute]);

  if (session.isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!session.isAuthenticated && isAuthRoute) {
    return <>{children}</>;
  }

  if (session.isAuthenticated && !isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader />
    </div>
  );
};
