import { userRepository } from '@/server/api/routers/user/repository';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const userRouter = createTRPCRouter({
  userById: protectedProcedure.query(async ({ ctx }) =>
    userRepository.getUserById(ctx.session.user.id)
  ),
});
