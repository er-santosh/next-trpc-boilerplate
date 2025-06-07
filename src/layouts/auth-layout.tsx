import { type PropsWithChildren } from 'react';

import Image from 'next/image';

import Logo from '@/components/common/logo';
import ThemeToggler from '@/components/common/theme-toggler';
import SocialLogins from '@/components/features/auth/social-logins';
import { Separator } from '@/components/ui/separator';

import { DEFAULT_AUTHENTICATED_REDIRECT_ROUTE } from '@/constants/app-routes';

import loginBg from '@/public/static/images/login-bg.jpg';

interface AuthLayoutProps extends PropsWithChildren {
  title: string;
  description?: string;
  showSocialLogin?: boolean;
  callbackUrl?: string;
}

const AuthLayout = ({
  children,
  title,
  description,
  showSocialLogin = true,
  callbackUrl = DEFAULT_AUTHENTICATED_REDIRECT_ROUTE,
}: AuthLayoutProps) => (
  <div className="flex min-h-screen">
    <div className="hidden w-1/2 bg-muted lg:block">
      <div className="relative h-full w-full">
        <Image
          src={loginBg}
          alt="Authentication background"
          fill
          className="object-cover"
          priority
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-background/20" />
        <div className="absolute bottom-12 left-12 max-w-md text-white">
          <h1 className="mb-4 text-4xl font-bold">Welcome back</h1>
          <p className="text-lg">Sign in to your account to continue your journey with us.</p>
        </div>
      </div>
    </div>

    <div className="flex w-full items-center justify-center lg:w-1/2">
      <div className="absolute right-4 top-4">
        <ThemeToggler />
      </div>

      <div className="mx-auto w-full max-w-md px-8 py-12">
        <div className="space-y-6">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>

          {showSocialLogin && (
            <>
              <SocialLogins callbackUrl={callbackUrl} />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
            </>
          )}
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default AuthLayout;
