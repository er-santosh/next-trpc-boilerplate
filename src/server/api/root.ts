import { testingRouter } from '@/server/api/routers/testing';
import { createTRPCRouter } from '@/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  testing: testingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
