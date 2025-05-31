import { defineConfig } from 'drizzle-kit';

import { env } from '@/env';

export default defineConfig({
  out: './drizzle',
  dialect: 'postgresql',
  schema: './src/db/schema',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
