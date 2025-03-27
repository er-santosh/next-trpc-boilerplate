'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { MoonIcon, SunIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

const ThemeToggler = () => {
  const t = useTranslations();
  const { resolvedTheme, setTheme } = useTheme();
  const toggleCurrentTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  const ariaLabel = t('Components.common.themeToggler.label');

  return (
    <Button type="button" onClick={toggleCurrentTheme} aria-label={ariaLabel}>
      <MoonIcon className="block dark:hidden" height="20" />
      <SunIcon className="hidden dark:block" height="20" />
    </Button>
  );
};

export default ThemeToggler;
