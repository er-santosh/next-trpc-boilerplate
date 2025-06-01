import { getTranslations } from 'next-intl/server';

import AuthLayout from '@/layouts/auth-layout';

import ForgotPasswordForm from '@/components/features/auth/forgot-password-form';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations({
    locale: (await props.params).locale,
    namespace: 'Pages.forgot_password',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const ForgotPasswordPage = async () => (
  <AuthLayout
    title="Forgot Password?"
    description="No worries, we will send you a link to reset your password."
    showSocialLogin={false}
  >
    <ForgotPasswordForm />
  </AuthLayout>
);

export default ForgotPasswordPage;
