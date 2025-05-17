import { FaGithub } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';

import { Link } from '@/i18n/navigation';

const HeroSection = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Next15 with Next-Auth and TRPC Boilerplate
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            A developer-friendly starter code for Next.js projects, built with Shadcn UI, Tailwind
            CSS, TypeScript, and more.
          </p>
        </div>
        <div className="gap-4 flex flex-col sm:flex-row">
          <Button size="lg" asChild>
            <Link
              href="https://github.com/er-santosh/next-trpc-boilerplate"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="mr-2 h-4 w-4" />
              View on GitHub
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link
              href="https://github.com/er-santosh/next-trpc-boilerplate"
              target="_blank"
              rel="noreferrer"
            >
              Documentation
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
