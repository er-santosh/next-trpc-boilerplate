import nextJest from 'next/jest';

import dotenv from 'dotenv';
import type { Config } from 'jest';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load `next.config.js` and `.env` files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/public/(.*)$': '<rootDir>/public/$1',
    'next/router': '<rootDir>/src/components/__mocks__/next-router.js',
    'next-intl': '<rootDir>/src/components/__mocks__/next-intl.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.{js,jsx,ts,tsx}',
    '!./src/**/_*.{js,jsx,ts,tsx}',
    '!./src/**/*.stories.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/tests/',
    '<rootDir>/tests-examples/',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
