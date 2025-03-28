'use client';

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';

import { THEME_STORAGE_KEY } from '@/constants/next-constants';

export const ThemeProvider = (props: ThemeProviderProps) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="light"
    enableSystem
    storageKey={THEME_STORAGE_KEY}
    disableTransitionOnChange
    {...props}
  />
);
