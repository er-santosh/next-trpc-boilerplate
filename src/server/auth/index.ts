import { createElement } from 'react';

import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import PasswordResetRequestTemplate from '@/components/email-templates/password-reset-request';

import { COOKIES } from '@/constants/cookies';

import { sendEmail } from '@/lib/resend';

import { db } from '@/db';
import * as schema from '@/db/schema';

import { env } from '@/env';
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  advanced: {
    cookiePrefix: COOKIES.SESSION_TOKEN_PREFIX,
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        from: env.RESEND_FROM,
        to: user.email,
        subject: 'Reset your password',
        react: createElement(PasswordResetRequestTemplate, {
          name: user.name,
          resetLink: url,
        }),
      });
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
});
