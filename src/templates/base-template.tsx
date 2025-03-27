import { siteConfig } from '@/config/app-config';
import { Github, Rocket } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Link } from '@/i18n/navigation';

const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    <div className="mx-auto grid size-full max-w-screen-lg grid-cols-[1fr] grid-rows-[auto_1fr_auto]">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Rocket className="h-6 w-6" />
              <span className="font-bold hidden sm:inline-block">{siteConfig.title}</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
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
            </nav>
          </div>
        </div>
      </header>
      <main>{props.children}</main>

      <footer className="w-full py-6 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <Rocket className="h-6 w-6" />
              <span className="font-bold">Next15 Boilerplate</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Next15 Boilerplate. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href={siteConfig.github.repoLink}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
);

export { BaseTemplate };
