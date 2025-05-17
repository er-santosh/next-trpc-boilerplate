import { getTranslations } from 'next-intl/server';

import { Hello } from '@/components/features/dashboard/hello';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations({
    locale: (await props.params).locale,
    namespace: 'Pages.dashboard',
  });

  return {
    title: t('meta_title'),
  };
}

const Dashboard = async () => (
  <div className="[&_p]:my-6">
    <Hello />
  </div>
);

export default Dashboard;
