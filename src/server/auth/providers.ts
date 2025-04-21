import { CredentialsSignin, type NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { LoginInputSchema } from '@/schemas/auth';

import { authService } from '@/server/api/routers/auth/service';

import { env } from '@/env';

const providers: NextAuthConfig['providers'] = [
  GoogleProvider({
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    authorization: {
      params: {
        prompt: 'consent',
        access_type: 'offline',
        response_type: 'code',
        scope: 'openid email profile',
      },
    },
    profile(profile) {
      return {
        id: profile.sub,
        first_name: profile.given_name,
        last_name: profile.family_name,
        email: profile.email,
        avatar_url: profile.picture || profile.avatar_url,
        emailVerified: profile.email_verified,
      };
    },
  }),
  GitHubProvider({
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    authorization: {
      params: {
        prompt: 'consent',
        access_type: 'offline',
        response_type: 'code',
        scope: 'read:user user:email',
      },
    },
    profile(profile) {
      return {
        first_name: profile.name || profile.login,
        last_name: profile.name || profile.login,
        email: profile.email,
        avatar_url: profile.avatar_url,
      };
    },
  }),
  CredentialsProvider({
    id: 'credentials',
    name: 'Credentials',
    credentials: {
      email: {
        label: 'Email',
        type: 'text',
      },
      password: {
        label: 'Password',
        type: 'password',
      },
    },
    async authorize(credentials) {
      if (!credentials) {
        throw new CredentialsSignin('No credentials provided');
      }

      const parsed = await LoginInputSchema.parseAsync(credentials);

      const { email, password } = parsed;

      try {
        const result = await authService.login({
          input: {
            email,
            password,
          },
        });

        return result.user;
      } catch {
        return null;
      }
    },
  }),
];

export default providers;
