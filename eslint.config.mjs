import { FlatCompat } from '@eslint/eslintrc';
import typescriptEslintParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import importHelpers from 'eslint-plugin-import-helpers';
import jestPlugin from 'eslint-plugin-jest';
import jestDomPlugin from 'eslint-plugin-jest-dom';
import jestFormattingPlugin from 'eslint-plugin-jest-formatting';
import onlyWarn from 'eslint-plugin-only-warn';
import playwrightPlugin from 'eslint-plugin-playwright';
import prettierPlugin from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import { dirname } from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
      parser: typescriptEslintParser,
    },
  },
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        sourceType: 'module',
      },
    },
  },
  {
    plugins: {
      onlyWarn,
      'import-helpers': importHelpers,
      'unused-imports': unusedImports,
      prettier: prettierPlugin,
      'react-hooks': pluginReactHooks,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      'prefer-const': 'warn',
      'no-var': 'warn',
      'object-shorthand': 'warn',
      'quote-props': ['warn', 'as-needed'],
      'no-console': 'error',
      'no-debugger': 'error',
      'prettier/prettier': 'warn',
      'promise/prefer-await-to-then': 'off',
      'jsx-a11y/anchor-has-content': 'off',
      'arrow-body-style': ['error', 'as-needed'],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/array-type': [
        'warn',
        {
          default: 'array',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      '@typescript-eslint/consistent-type-assertions': [
        'warn',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'never',
        },
      ],
      'no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
      ],
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'import-helpers/order-imports': [
        'error',
        {
          newlinesBetween: 'always',
          groups: [
            ['/^react$/', '/^react-redux/', '/^redux-persist/', '/^@reduxjs/toolkit/'],
            ['/^next/'],
            'module',
            '/^@/app/',
            '/^@/layouts/',
            '/^@/providers/',
            '/^@/components/',
            '/^@/hocs/',
            '/^@/configs/',
            '/^@/constants/',
            '/^@/hooks/',
            '/^@/services/',
            '/^@/store/',
            '/^@/utils/',
            '/^@/i18n/',
            '/^@/lib/',
            '/^@/trpc/',
            '/^@/schemas/',
            '/^@/server/',
            '/^@/db/',
            '/^@/env/',
            '/^@/types/',
            '/^@/styles/',
            '/^@/public/',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
      ...pluginReactHooks.configs.recommended.rules,
      'react/jsx-fragments': ['warn', 'syntax'],
      'react/jsx-filename-extension': [
        'warn',
        {
          extensions: ['ts', 'tsx'],
        },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
    },
  },
  {
    files: ['**/*.tsx', '**/{__mocks__,tests,tests-examples}/*.{js,ts}', '**/src/app/api/**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  // Configuration for testing
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/{__tests__,__mocks__}/*.js'],
    plugins: {
      jest: jestPlugin,
      'jest-formatting': jestFormattingPlugin,
      'testing-library': testingLibraryPlugin,
      'jest-dom': jestDomPlugin,
    },
    ...jestPlugin.configs['flat/recommended'],
    ...jestDomPlugin.configs['flat/recommended'],
    ...jestFormattingPlugin.configs['flat/recommended'],
    ...testingLibraryPlugin.configs['flat/dom'],
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
    },
  },
  // Configuration for e2e testing (Playwright)
  {
    files: ['**/*.spec.ts'],
    ...playwrightPlugin.configs['flat/recommended'],
  },
  // Configuration for TypeScript declaration files
  {
    files: ['**/*.d.ts'],
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
    },
  },
  {
    ignores: [
      '.next',
      '.swc',
      'build',
      'coverage',
      'junit.xml',
      'storybook-static',
      'typings/*',
      '!.storybook/*',
      'migrations',
      'playwright-report',
      'test-results',
    ],
  },
];

export default eslintConfig;
