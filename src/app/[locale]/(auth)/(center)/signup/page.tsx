import { getTranslations } from 'next-intl/server';

import AuthCenterLayout from '@/layouts/auth-center-layout';

import SignUpForm from './_components/SignUpForm';

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

const SignUpPage = async (props: {
  searchParams: Promise<{ callbackUrl: string | undefined }>;
}) => {
  const callbackUrl = (await props.searchParams).callbackUrl;

  return (
    <AuthCenterLayout title="Sign Up" description="Create new account">
      <SignUpForm callbackUrl={callbackUrl} />
    </AuthCenterLayout>
  );
};

export default SignUpPage;
