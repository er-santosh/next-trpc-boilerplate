'use client';

import { useCallback, useEffect, type PropsWithChildren } from 'react';

import { useSearchParams } from 'next/navigation';

import Loader from '@/components/ui/loader';

import { APP_ROUTES } from '@/constants/app-routes';

import { useSession } from '@/stores/session-store';

import { usePathname, useRouter } from '@/i18n/navigation';

const publicRoutes = [APP_ROUTES.AUTH.SIGN_IN, APP_ROUTES.AUTH.SIGN_UP];

export const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isPublicRoute = useCallback(() => publicRoutes.includes(pathname), [pathname]);

  useEffect(() => {
    if (isPublicRoute() && session.status === 'authenticated') {
      router.push(APP_ROUTES.DASHBOARD);
    }

    if (session.status === 'unauthenticated' && !isPublicRoute()) {
      router.push(`${APP_ROUTES.AUTH.SIGN_IN}?${searchParams.toString()}`);
    }
  }, [session.status, pathname, router, searchParams, isPublicRoute]);

  if (session.status === 'loading' || (session.status === 'unauthenticated' && !isPublicRoute())) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return children;
};
