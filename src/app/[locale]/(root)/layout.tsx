import RootLayout from '@/layouts/root-layout';

const Layout = (props: { children: React.ReactNode }) => (
  <RootLayout>
    <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
  </RootLayout>
);

export default Layout;
