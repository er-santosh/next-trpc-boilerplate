import { type NextAuthConfig } from 'next-auth';

import { APP_ROUTES } from '@/constants/app-routes';

import events from '@/server/auth/events';
import providers from '@/server/auth/providers';

const authConfig = {
  providers,
  events,
  callbacks: {
    async jwt({ token, user }) {
      const newToken = { ...token };

      if (user) {
        newToken.user = user;
      }

      return newToken;
    },
    async session({ session, token }) {
      const newSession = { ...session };

      if (token.user) {
        newSession.user = {
          ...newSession.user,
          ...token.user,
        };
      }

      return newSession;
    },
    authorized: async ({ auth }) => !!auth,
  },
  pages: {
    signIn: APP_ROUTES.AUTH.SIGN_IN,
    newUser: APP_ROUTES.AUTH.SIGN_UP,
    error: APP_ROUTES.AUTH.SIGN_IN,
  },
} satisfies NextAuthConfig;

export default authConfig;
