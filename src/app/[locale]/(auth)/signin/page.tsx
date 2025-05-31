import { getTranslations } from 'next-intl/server';

import AuthLayout from '@/layouts/auth-layout';

import SignInForm from '@/components/features/auth/signin-form';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations({
    locale: (await props.params).locale,
    namespace: 'Pages.sign_in',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const SignInPage = async (props: {
  searchParams: Promise<{ callbackUrl: string | undefined }>;
}) => {
  const callbackUrl = (await props.searchParams).callbackUrl;

  return (
    <AuthLayout
      callbackUrl={callbackUrl}
      title="Sign In"
      description="Enter your email below to sign in to your account"
    >
      <SignInForm callbackUrl={callbackUrl} />
    </AuthLayout>
  );
};

export default SignInPage;
