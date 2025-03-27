import { Github, Rocket } from 'lucide-react';

import siteConfig from '@/configs/site-config';

import { Link } from '@/i18n/navigation';

const Footer = () => (
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
);

export default Footer;
