import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

import * as schema from '@/db/schema';

import { env } from '@/env';

export const pool = new Pool({ connectionString: env.DATABASE_URL });

export const db = drizzle(pool, {
  schema,
});

// Disable migrate function if using Edge runtime and use `npm run db:migrate` instead.
// Only run migrate in development. Otherwise, migrate will also be run during the build which can cause errors.
// Migrate during the build can cause errors due to the locked database when multiple migrations are running at the same time.
if (env.DB_MIGRATIONS_ENABLED) {
  migrate(db, { migrationsFolder: './migrations' }).catch(_error => {});
}
