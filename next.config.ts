import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
  },
  // We don't want to run Type Checking on Production Builds
  // as we already check it on the CI within each Pull Request
  typescript: { ignoreBuildErrors: true },
  // We don't want to run ESLint Checking on Production Builds
  // as we already check it on the CI within each Pull Request
  // we also configure ESLint to run its lint checking on all files (next lint)
  eslint: { dirs: ['.'], ignoreDuringBuilds: true },
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
    optimizePackageImports: ['tailwindcss'],
    // Removes the warning regarding the WebPack Build Worker
    webpackBuildWorker: false,
  },
};

const withNextIntl = createNextIntlPlugin();

const nextWithIntl = withNextIntl(nextConfig);

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextIntlWithBundleAnalyzer = bundleAnalyzer(nextWithIntl);

export default nextIntlWithBundleAnalyzer;
