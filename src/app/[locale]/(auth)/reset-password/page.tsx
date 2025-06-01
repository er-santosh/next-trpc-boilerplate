import { getTranslations } from 'next-intl/server';

import AuthLayout from '@/layouts/auth-layout';

import ResetPasswordForm from '@/components/features/auth/reset-password-form';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations({
    locale: (await props.params).locale,
    namespace: 'Pages.reset_password',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const ResetPasswordPage = async (props: {
  searchParams: Promise<{ token: string | undefined }>;
}) => {
  const token = (await props.searchParams).token;

  return (
    <AuthLayout title="Reset Your Password" description="" showSocialLogin={false}>
      <ResetPasswordForm token={token} />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
