import { TRPCError } from '@trpc/server';

import { LoginInputSchema, RegisterInputSchema } from '@/schemas/auth';

import { Logger } from '@/server/api/common/logger';
import { authService } from '@/server/api/routers/auth/service';
import {
  type MeQueryResult,
  type RegisterReturn,
  type ServerSession,
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
      async ({ input, ctx }): Promise<ServerSession> =>
        authService.login({ input, headers: ctx.headers })
    ),

  me: protectedProcedure.query(
    async ({ ctx }): Promise<MeQueryResult> => ({
      user: ctx.session.user,
    })
  ),

  signOut: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await authService.logout({
        session: ctx.session,
        headers: ctx.headers,
      });
    } catch (error: unknown) {
      Logger.error('Failed to logout', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to logout',
      });
    }
  }),

  signOutAllSessions: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await authService.removeAllSessions({ headers: ctx.headers, userId: ctx.session.user.id });
    } catch (error: unknown) {
      Logger.error('Failed to logout all sessions', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to logout all sessions',
      });
    }
  }),
});
