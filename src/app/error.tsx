'use client';

import { type FC } from 'react';

import ErrorLayout from '@/layouts/error-layout';

import ErrorState from '@/components/common/error-state';

const ErrorPage: FC<{ error: Error }> = ({ error }) => (
  <ErrorLayout>
    <ErrorState message={error.message} />
  </ErrorLayout>
);

export default ErrorPage;
