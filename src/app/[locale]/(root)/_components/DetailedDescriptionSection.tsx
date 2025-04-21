import { FaArrowUpRightFromSquare, FaBolt } from 'react-icons/fa6';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Link } from '@/i18n/navigation';

const DetailedDescriptionSection = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
    <div className="container px-4 md:px-6">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="space-y-4">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            About the Project
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Developer Experience First
          </h2>
          <p className="text-muted-foreground md:text-lg">
            <span role="img" aria-label="rocket">
              🚀
            </span>{' '}
            Next15 with Next-Auth Boilerplate is a developer-friendly starter code for Next.js
            projects, built with Tailwind CSS, and TypeScript.{' '}
            <span role="img" aria-label="zap">
              ⚡️
            </span>{' '}
            Made with developer experience first.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center">
              <FaBolt className="mr-2 h-4 w-4 text-primary" />
              Next.js, TypeScript, ESLint, Prettier
            </li>
            <li className="flex items-center">
              <FaBolt className="mr-2 h-4 w-4 text-primary" />
              Husky, Lint-Staged, Jest, Testing Library
            </li>
            <li className="flex items-center">
              <FaBolt className="mr-2 h-4 w-4 text-primary" />
              Commitlint, VSCode, PostCSS, Tailwind CSS
            </li>
            <li className="flex items-center">
              <FaBolt className="mr-2 h-4 w-4 text-primary" />
              Authentication with next-auth
            </li>
            <li className="flex items-center">
              <FaBolt className="mr-2 h-4 w-4 text-primary" />
              Database with Prisma ORM
            </li>
            <li className="flex items-center">
              <FaBolt className="mr-2 h-4 w-4 text-primary" />
              End-to-end typesafe APIs with tRPC
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Integrated Tools</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Internationalization</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  className="flex items-center text-sm text-primary hover:underline"
                  href="https://next-intl.dev/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Next Intl
                  <FaArrowUpRightFromSquare className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">API Layer</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  className="flex items-center text-sm text-primary hover:underline"
                  href="https://trpc.io"
                  target="_blank"
                  rel="noreferrer"
                >
                  tRPC
                  <FaArrowUpRightFromSquare className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DetailedDescriptionSection;
