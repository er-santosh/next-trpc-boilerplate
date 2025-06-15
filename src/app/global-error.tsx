'use client';

import { type FC } from 'react';

import ErrorLayout from '@/layouts/error-layout';

import AppProvider from '@/providers/app-provider';

import ErrorState from '@/components/common/error-state';

type GlobalErrorPageProps = {
  error: Error & { digest?: string };
  params: { locale: string };
};
const GlobalErrorPage: FC<GlobalErrorPageProps> = ({ params, error }) => (
  <html lang={params.locale}>
    <body>
      <AppProvider>
        <ErrorLayout>
          <ErrorState message={error.message} />
        </ErrorLayout>
      </AppProvider>
    </body>
  </html>
);

export default GlobalErrorPage;
