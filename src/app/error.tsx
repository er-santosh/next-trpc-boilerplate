'use client';

import { type FC } from 'react';

import { useTranslations } from 'next-intl';

import { ArrowRightIcon } from 'lucide-react';

import CenteredLayout from '@/layouts/centered-layout';

import { Button } from '@/components/ui/button';

import { Link } from '@/i18n/navigation';

const ErrorPage: FC<{ error: Error }> = () => {
  const t = useTranslations();

  return (
    <CenteredLayout>
      <main className="flex flex-col gap-3 text-center items-center justify-center">
        <h1 className="text-4xl font-semibold"> 500 </h1>
        <h1 className="special mt-3">{t('Layouts.error.internalServerError.title')}</h1>
        <p className="mt-3 max-w-sm text-center text-lg">
          {t('Layouts.error.internalServerError.description')}
        </p>
        <Button asChild>
          <Link href={'/'}>
            {t('Layouts.error.backToHome')}
            <ArrowRightIcon />
          </Link>
        </Button>
      </main>
    </CenteredLayout>
  );
};

export default ErrorPage;
