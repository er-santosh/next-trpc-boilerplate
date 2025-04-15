import { getTranslations } from 'next-intl/server';

import {
  FaArrowUpRightFromSquare,
  FaBolt,
  FaCode,
  FaDatabase,
  FaGithub,
  FaGlobe,
  FaRocket,
  FaShield,
} from 'react-icons/fa6';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Link } from '@/i18n/navigation';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations({
    locale: (await props.params).locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Next15 with Next-Auth and TRPC Boilerplate
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                A developer-friendly starter code for Next.js projects, built with Shadcn UI,
                Tailwind CSS, TypeScript, and more.
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

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Everything you need to build modern web applications
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Made with developer experience first: Next.js, TypeScript, ESLint, Prettier, and
                more.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <Card>
              <CardHeader className="pb-2">
                <FaRocket className="h-6 w-6 text-primary mb-2" />
                <CardTitle>Next.js 15</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Built on the latest version of Next.js with App Router for optimal performance and
                  developer experience.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <FaBolt className="h-6 w-6 text-primary mb-2" />
                <CardTitle>TypeScript & ESLint</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Type-safe code with TypeScript and code quality tools like ESLint, Prettier, and
                  Husky.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <FaShield className="h-6 w-6 text-primary mb-2" />
                <CardTitle>Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Secure authentication with next-auth, supporting multiple providers and
                  strategies.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <FaDatabase className="h-6 w-6 text-primary mb-2" />
                <CardTitle>Database Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Prisma ORM with support for PostgreSQL.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <FaCode className="h-6 w-6 text-primary mb-2" />
                <CardTitle>tRPC</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  End-to-end typesafe APIs with tRPC for seamless client-server communication.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <FaGlobe className="h-6 w-6 text-primary mb-2" />
                <CardTitle>Internationalization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Multi-language support (i18n) for building global applications with next-intl.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Description Section */}
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

      {/* CTA Section */}
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
    </>
  );
}
