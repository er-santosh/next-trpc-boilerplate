import NextAuth from 'next-auth';

import { PrismaAdapter } from '@auth/prisma-adapter';

import authConfig from '@/server/auth/config';

import { db } from '@/db';

const adapter = PrismaAdapter(db);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
});
