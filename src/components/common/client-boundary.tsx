import { Suspense, type PropsWithChildren, type ReactNode } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import ErrorState from '@/components/common/error-state';
import LoadingState from '@/components/common/loading-state';

import { HydrateClient } from '@/trpc/server';

interface ClientBoundaryProps extends PropsWithChildren {
  errorFallback?: ReactNode;
  suspenseFallback?: ReactNode;
}

const ClientBoundary = ({
  children,
  errorFallback = <ErrorState />,
  suspenseFallback = <LoadingState />,
}: ClientBoundaryProps) => (
  <HydrateClient>
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  </HydrateClient>
);

export default ClientBoundary;
