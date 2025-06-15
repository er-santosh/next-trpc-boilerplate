'use client';

import ErrorLayout from '@/layouts/error-layout';

import ErrorState from '@/components/common/error-state';

const NotFoundPage = () => (
  <ErrorLayout>
    <ErrorState code={404} message="Page Not Found" />
  </ErrorLayout>
);

export default NotFoundPage;
