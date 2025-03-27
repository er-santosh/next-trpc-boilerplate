import type { PropsWithChildren } from 'react';

const BaseLayout = ({ children }: PropsWithChildren) => (
  <div className="grid size-full grid-cols-[1fr] grid-rows-[1fr]">{children}</div>
);

export default BaseLayout;
