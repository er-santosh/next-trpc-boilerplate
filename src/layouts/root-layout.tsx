import { type PropsWithChildren } from 'react';

import Footer from '@/components/containers/footer';
import Navbar from '@/components/containers/navbar';

const RootLayout = ({ children }: PropsWithChildren) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    <div className="mx-auto grid size-full max-w-screen-lg grid-cols-[1fr] grid-rows-[auto_1fr_auto]">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  </div>
);

export default RootLayout;
