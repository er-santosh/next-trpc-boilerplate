import { getTranslations } from 'next-intl/server';

import CTASection from '@/app/[locale]/(root)/_components/CTASection';
import DetailedDescriptionSection from '@/app/[locale]/(root)/_components/DetailedDescriptionSection';
import FeaturesSection from '@/app/[locale]/(root)/_components/FeaturesSection';
import HeroSection from '@/app/[locale]/(root)/_components/HeroSection';

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
