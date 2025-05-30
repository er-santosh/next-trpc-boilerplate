import { getTranslations } from 'next-intl/server';

import HeroSection from '@/components/features/home/hero-section';

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
      <HeroSection />
    </>
  );
}
