import { authRouter } from '@/server/api/routers/auth/router';
import { userRouter } from '@/server/api/routers/user/router';
import { createTRPCRouter } from '@/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
