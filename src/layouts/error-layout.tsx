import type { PropsWithChildren } from 'react';

const ErrorLayout = ({ children }: PropsWithChildren) => (
  <div className=" flex w-full min-w-0 items-center justify-center px-4 py-14 md:px-14 lg:px-28">
    {children}
  </div>
);

export default ErrorLayout;
