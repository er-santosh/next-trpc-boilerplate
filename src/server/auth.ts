import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { type AuthOptions, getServerSession, type Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { APP_ROUTES } from '@/constants/app-routes';

import { api } from '@/trpc/server';

import { Logger } from '@/server/api/common/logger';

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 * */
export const authConfig: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: APP_ROUTES.AUTH.SIGN_IN,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        // Call an external API endpoint to sign in
        const result = await api.auth.signIn(credentials);

        if (!result) {
          throw new Error('Invalid credentials');
        }

        return {
          id: result.user.id,
          sessionToken: result.sessionToken,
        };
      },
    }),
  ],
  events: {
    async signIn({ user }) {
      Logger.info('User signed in', user);
    },
    async signOut() {
      Logger.info('User signed out');
    },
    async createUser({ user }) {
      Logger.info('User created', user);
    },
    async updateUser({ user }) {
      Logger.info('User updated', user);
    },
    async linkAccount({ user, account }) {
      Logger.info('Account linked', { user, account });
    },
    async session({ session }) {
      Logger.info('Session', session);
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      const newToken = { ...token };

      if (user) {
        newToken.id = user.id;
        newToken.sessionToken = user.sessionToken;
      }

      return newToken;
    },
    async session({ token, session }) {
      const newSession = { ...session };

      if (token) {
        newSession.user = {
          id: token.id,
          sessionToken: token.sessionToken,
        };
      }

      return newSession;
    },
  },
} satisfies AuthOptions;

export async function getServerAuthSession(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
): Promise<Session | null> {
  try {
    const session = await getServerSession(...args, authConfig);

    return session;
  } catch (error: unknown) {
    Logger.error('Failed to get session', error);

    return null;
  }
}

export async function getCurrentUser(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
): Promise<
  | {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  | undefined
> {
  const session = await getServerAuthSession(...args);

  return session?.user;
}
