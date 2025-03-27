import { Github, Rocket } from 'lucide-react';

import LocaleSwitcher from '@/components/common/locale-switcher';
import ThemeToggler from '@/components/common/theme-toggler';
import { Button } from '@/components/ui/button';

import siteConfig from '@/configs/site-config';

import { Link } from '@/i18n/navigation';

const Navbar = () => (
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
          <Button variant="ghost" size="sm" asChild>
            <Link href={siteConfig.github.repoLink} target="_blank" rel="noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link href={siteConfig.github.repoLink} target="_blank" rel="noreferrer">
              Get Started
            </Link>
          </Button>
          <ThemeToggler />
          <LocaleSwitcher />
        </nav>
      </div>
    </div>
  </header>
);

export default Navbar;
