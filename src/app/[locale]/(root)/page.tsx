import { getTranslations } from 'next-intl/server';

import CTASection from '@/components/features/home/cta-section';
import DetailedDescriptionSection from '@/components/features/home/detailed-description-section';
import FeaturesSection from '@/components/features/home/features-section';
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

      {/* Features Section */}
      <FeaturesSection />

      {/* Detailed Description Section */}
      <DetailedDescriptionSection />

      {/* CTA Section */}
      <CTASection />
    </>
  );
}
