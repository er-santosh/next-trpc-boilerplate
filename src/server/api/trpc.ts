/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { cache } from 'react';

import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';

import { initTRPC, TRPCError } from '@trpc/server';
import type { User } from 'better-auth';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { auth } from '@/server/auth';

import { db } from '@/db';

/**
 * Defines your context shape.
 * Add fields here that the inner context brings.
 */
interface CreateContextOptions {
  headers: Headers;
  req: NextRequest;
}

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = cache(async (opts: CreateContextOptions) => {
  'use server';
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    ...opts,
    session,
    db,
  };
});

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

export const createCallerFactory = t.createCallerFactory;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

type ProtectedProcedureOpts = TRPCContext;
const enforceUserIsAuthenticated = t.middleware(async opts => {
  const session = opts.ctx.session;

  if (!session || !session.user?.id) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to perform this action',
    });
  }

  try {
    const user = await opts.ctx.db.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to perform this action',
      });
    }

    return await opts.next({
      ctx: {
        ...opts.ctx,
        session: {
          ...session,
          user: {
            ...session.user,
            ...(user as User),
          },
        },
      } satisfies ProtectedProcedureOpts,
    });
  } catch (error: unknown) {
    if (error instanceof TRPCError) {
      throw error;
    }
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch user details',
    });
  }
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthenticated);
