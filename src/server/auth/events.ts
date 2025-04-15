import type { NextAuthConfig } from 'next-auth';

import { Logger } from '@/server/api/common/logger';

const events: NextAuthConfig['events'] = {
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
} as const;

export default events;
