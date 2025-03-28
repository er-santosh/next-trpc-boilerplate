import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

import withBundleAnalyzer from '@next/bundle-analyzer';
import { createJiti } from 'jiti';

const jiti = createJiti(import.meta.url);

jiti.esmResolve('./src/env');

import {
  BASE_PATH,
  ENABLE_STANDALONE_OUTPUT,
  ENABLE_STATIC_EXPORT,
} from './src/constants/next-constants';
import { env } from './src/env';
import { redirects, rewrites } from './src/utils/next-redirects';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Just to ensure that React is always on strict mode
  reactStrictMode: true,
  // We intentionally disable Next.js's built-in i18n support
  // as we dom have our own i18n and internationalisation engine
  i18n: null,
  // We allow the BASE_PATH to be overridden in case that the Website
  // is being built on a subdirectory (e.g. /nodejs-website)
  basePath: BASE_PATH,
  images: {
    // We disable image optimisation during static export builds
    unoptimized: ENABLE_STATIC_EXPORT,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/nodejs/**',
      },
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fonts.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // On static export builds we want the output directory to be "build"
  distDir: ENABLE_STATIC_EXPORT ? 'build' : '.next',
  // On static export builds we want to enable the export feature
  output: ENABLE_STATIC_EXPORT ? 'export' : ENABLE_STANDALONE_OUTPUT ? 'standalone' : undefined,
  // This configures all the Next.js rewrites, which are used for rewriting internal URLs into other internal Endpoints
  // This feature is not supported within static export builds, hence we pass an empty array if static exports are enabled
  rewrites: !ENABLE_STATIC_EXPORT ? rewrites : undefined,
  // This configures all Next.js redirects
  redirects: !ENABLE_STATIC_EXPORT ? redirects : undefined,
  // We don't want to run Type Checking on Production Builds
  // as we already check it on the CI within each Pull Request
  typescript: { ignoreBuildErrors: true },
  // We don't want to run ESLint Checking on Production Builds
  // as we already check it on the CI within each Pull Request
  // we also configure ESLint to run its lint checking on all files (next lint)
  eslint: { dirs: ['.'], ignoreDuringBuilds: true },
  webpack(config, { webpack: _ }) {
    // Next.js WebPack Bundler does not know how to handle `.mjs` files on `node_modules`
    // This is not an issue when using TurboPack as it uses SWC and it is ESM-only
    // Once Next.js uses Turbopack for their build process we can remove this
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: { fullySpecified: false },
    });

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    // A list of packages that Next.js should automatically evaluate and optimise the imports for.
    // @see https://vercel.com/blog/how-we-optimized-package-imports-in-next-js
    optimizePackageImports: [
      '@radix-ui/react-avatar',
      '@radix-ui/react-select',
      '@radix-ui/react-toast',
      'tailwindcss',
    ],
  },
  transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core'],
};

const withNextIntl = createNextIntlPlugin();

const nextWithIntl = withNextIntl(nextConfig);

const bundleAnalyzer = withBundleAnalyzer({
  enabled: env.ANALYZE,
});

const nextIntlWithBundleAnalyzer = bundleAnalyzer(nextWithIntl);

export default nextIntlWithBundleAnalyzer;
