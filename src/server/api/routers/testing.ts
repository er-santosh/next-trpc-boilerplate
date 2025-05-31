import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const testingRouter = createTRPCRouter({
  getTesting: publicProcedure.query(() => ({
    message: 'This is a test message from the testing router',
    timestamp: new Date().toISOString(),
  })),
});
