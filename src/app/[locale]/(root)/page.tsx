import { getTranslations } from 'next-intl/server';

import HeroSection from '@/components/features/home/hero-section';

import { ExternalApi } from '@/services/apis/external-api';

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

export default async function LandingPage() {
  const data = await ExternalApi.getExternalData();

  // eslint-disable-next-line no-console
  console.log('External API Data:', data);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />
    </>
  );
}
