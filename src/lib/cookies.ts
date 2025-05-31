/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import Cookies from 'js-cookie';

import { COOKIE_NAMES } from '@/constants/cookies';
import { IS_SERVER } from '@/constants/window';

export function getNextCookieStore(): any {
  const { cookies } = require('next/headers');
  const cookieStore = cookies();

  return cookieStore;
}

export function setCookie(key: string, value: string, options?: Cookies.CookieAttributes): void {
  Cookies.set(key, value, {
    expires: 7,
    secure: true,
    sameSite: 'strict',
    ...options,
  });
}

export function getCookie(key: string): string | undefined {
  if (IS_SERVER) {
    const cookieStore = getNextCookieStore();

    return cookieStore.get(key)?.value || '';
  }

  return Cookies.get(key);
}

export function removeCookie(key: string): void {
  Cookies.remove(key);
}

export function setAuthTokenCookie(token: string, options?: Cookies.CookieAttributes): void {
  setCookie(COOKIE_NAMES.AUTH_TOKEN, token, options);
}

export function getAuthTokenCookie(): string {
  return getCookie(COOKIE_NAMES.AUTH_TOKEN) || '';
}

export function removeAuthTokenCookie(): void {
  removeCookie(COOKIE_NAMES.AUTH_TOKEN);
}
