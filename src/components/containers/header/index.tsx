import { FaGithub, FaRocket } from 'react-icons/fa6';

import LocaleSwitcher from '@/components/common/locale-switcher';
import ThemeToggler from '@/components/common/theme-toggler';
import { Button } from '@/components/ui/button';

import siteConfig from '@/configs/site-config';

import { APP_ROUTES } from '@/constants/app-routes';

import { Link } from '@/i18n/navigation';

const Header = () => (
  <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
      <div className="flex gap-6 md:gap-10">
        <Link href="/" className="flex items-center space-x-2">
          <FaRocket className="h-6 w-6" />
          <span className="font-bold hidden sm:inline-block">{siteConfig.title}</span>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-end space-x-4">
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href={siteConfig.github.repoLink} target="_blank" rel="noreferrer">
              <FaGithub className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button asChild>
            <Link href={APP_ROUTES.AUTH.SIGN_IN}>Get Started</Link>
          </Button>
          <ThemeToggler />
          <LocaleSwitcher />
        </nav>
      </div>
    </div>
  </header>
);

export default Header;
