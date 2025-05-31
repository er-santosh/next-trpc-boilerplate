import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const usersRouter = createTRPCRouter({
  getUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.query.user.findMany();

    return users;
  }),
});
