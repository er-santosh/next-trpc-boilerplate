import { getTranslations } from 'next-intl/server';

import AuthLayout from '@/layouts/auth-layout';

import SignUpForm from '@/components/features/auth/signup-form';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations({
    locale: (await props.params).locale,
    namespace: 'Pages.sign_up',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const SignUpPage = async (props: {
  searchParams: Promise<{ callbackUrl: string | undefined }>;
}) => {
  const callbackUrl = (await props.searchParams).callbackUrl;

  return (
    <AuthLayout callbackUrl={callbackUrl} title="Sign Up" description="Create new account">
      <SignUpForm callbackUrl={callbackUrl} />
    </AuthLayout>
  );
};

export default SignUpPage;
