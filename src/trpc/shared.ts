import { defaultShouldDehydrateQuery, QueryClient } from '@tanstack/react-query';
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import superjson from 'superjson';

import { isTRPCClientErrorWithCode } from '@/utils/is-trpc-client-error-with-code';

import { type AppRouter } from '@/server/api/root';

export const transformer = superjson;

function getBaseUrl(): string {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL !== undefined) return `https://${process.env.VERCEL_URL}`;

  return process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getUrl(): string {
  return `${getBaseUrl()}/api/trpc`;
}

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

let clientQueryClientSingleton: QueryClient;

export function getQueryClient(): QueryClient {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  }

  return (clientQueryClientSingleton ??= makeQueryClient());
}

export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
        retry(failureCount, error) {
          if (isTRPCClientErrorWithCode(error) && error.data.code === 'UNAUTHORIZED') {
            return false;
          }

          return failureCount < 2;
        },
      },
      dehydrate: {
        serializeData: superjson.serialize,
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
    },
  });
}
