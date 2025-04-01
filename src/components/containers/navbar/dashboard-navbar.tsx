import { Rocket } from 'lucide-react';

import LocaleSwitcher from '@/components/common/locale-switcher';
import ThemeToggler from '@/components/common/theme-toggler';
import LogoutButton from '@/components/features/auth/logout-button';

import siteConfig from '@/configs/site-config';

import { Link } from '@/i18n/navigation';

const DashboardNavbar = () => (
  <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
      <div className="flex gap-6 md:gap-10">
        <Link href="/" className="flex items-center space-x-2">
          <Rocket className="h-6 w-6" />
          <span className="font-bold hidden sm:inline-block">{siteConfig.title}</span>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-end space-x-4">
        <nav className="flex items-center space-x-4">
          <LogoutButton />
          <ThemeToggler />
          <LocaleSwitcher />
        </nav>
      </div>
    </div>
  </header>
);

export default DashboardNavbar;
