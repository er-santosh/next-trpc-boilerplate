import { getTranslations } from 'next-intl/server';

import Account from '@/components/features/dashboard/account';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations({
    locale: (await props.params).locale,
    namespace: 'Pages.account',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}
export default function AccountPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <Account />
    </div>
  );
}
