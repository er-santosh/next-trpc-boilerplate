import { FaBolt, FaCode, FaDatabase, FaGlobe, FaRocket, FaShield } from 'react-icons/fa6';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FeaturesSection = () => (
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
            Made with developer experience first: Next.js, TypeScript, ESLint, Prettier, and more.
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
              Secure authentication with next-auth, supporting multiple providers and strategies.
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
);

export default FeaturesSection;
