'use client';

import { useMemo, type PropsWithChildren } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';

import { getQueryClient, getUrl, transformer } from '@/trpc/shared';

import { type AppRouter } from '@/server/api/root';

export const api = createTRPCReact<AppRouter>();

export const TRPCReactProvider: React.FC<PropsWithChildren> = props => {
  const queryClient = getQueryClient();

  const trpcClient = useMemo(
    () =>
      api.createClient({
        links: [
          loggerLink({
            enabled: op =>
              process.env.NODE_ENV === 'development' ||
              (op.direction === 'down' && op.result instanceof Error),
          }),
          httpBatchLink({
            url: getUrl(),
            transformer,
          }),
        ],
      }),
    []
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </api.Provider>
  );
};
