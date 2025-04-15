import { getTranslations } from 'next-intl/server';

import { auth } from '@/server/auth';

const Hello = async () => {
  const t = await getTranslations('Pages.dashboard');
  const session = await auth();

  return (
    <>
      <p>
        👋{' '}
        <span
          dangerouslySetInnerHTML={{
            __html: t('hello_message', { email: session?.user?.email || '' }),
          }}
        />
      </p>
    </>
  );
};

export { Hello };
