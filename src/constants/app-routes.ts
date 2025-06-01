export const APP_ROUTES = {
  HOME: '/',
  AUTH: {
    SIGN_IN: '/signin',
    SIGN_UP: '/signup',
  },
  DASHBOARD: {
    ROOT: '/dashboard',
    ACCOUNT: '/dashboard/account',
  },
};

export const PUBLIC_ROUTES = [APP_ROUTES.HOME];
export const AUTH_ROUTES = [APP_ROUTES.AUTH.SIGN_IN, APP_ROUTES.AUTH.SIGN_UP];

export const DEFAULT_SIGNIN_REDIRECT_ROUTE = APP_ROUTES.DASHBOARD.ROOT;
export const DEFAULT_SIGNUP_REDIRECT_ROUTE = APP_ROUTES.DASHBOARD.ROOT;
