import { LoginInputSchema, RegisterInputSchema } from '@/schemas/auth';

import { authService } from '@/server/api/routers/auth/service';
import {
  type LoginReturn,
  type MeQueryResult,
  type RegisterReturn,
} from '@/server/api/routers/auth/types';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(RegisterInputSchema)
    .mutation(
      async ({ input, ctx }): Promise<RegisterReturn> =>
        authService.register({ input, headers: ctx.headers })
    ),
  signIn: publicProcedure
    .input(LoginInputSchema)
    .mutation(
      async ({ input, ctx }): Promise<LoginReturn> =>
        authService.login({ input, headers: ctx.headers })
    ),
  me: protectedProcedure.query(
    async ({ ctx }): Promise<MeQueryResult> => ({
      user: ctx.session?.user,
    })
  ),
});
