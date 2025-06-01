import type { PropsWithChildren } from 'react';

import { AppHeader } from '@/components/containers/header/app-header';
import { AppSidebar } from '@/components/containers/sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const style = {
  '--sidebar-width': 'calc(var(--spacing) * 72)',
  '--header-height': 'calc(var(--spacing) * 12)',
};

const ProtectedLayout = ({ children }: PropsWithChildren) => (
  <SidebarProvider style={style as React.CSSProperties}>
    <AppSidebar variant="inset" />
    <SidebarInset>
      <AppHeader />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">{children}</div>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
);

export default ProtectedLayout;
