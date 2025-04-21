import { FaGithub } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';

import { Link } from '@/i18n/navigation';

const CTASection = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Ready to start your next project?
          </h2>
          <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
            Get started with Next15 Boilerplate today and build your application faster.
          </p>
        </div>
        <div className="gap-4 flex flex-col sm:flex-row">
          <Button size="lg" variant="secondary" asChild>
            <Link
              href="https://github.com/er-santosh/next-trpc-boilerplate"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="mr-2 h-4 w-4" />
              Star on GitHub
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-secondary-foreground/10 hover:text-secondary"
            asChild
          >
            <Link
              href="https://github.com/er-santosh/next-trpc-boilerplate"
              target="_blank"
              rel="noreferrer"
            >
              Clone Repository
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
