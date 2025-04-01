import { getTranslations } from 'next-intl/server';

import { getMe } from '@/server/helpers';

const Hello = async () => {
  const t = await getTranslations('Pages.dashboard');
  const user = await getMe();

  return (
    <>
      <p>
        👋{' '}
        <span
          dangerouslySetInnerHTML={{
            __html: t('hello_message', { email: user?.user?.email || '' }),
          }}
        />
      </p>
    </>
  );
};

export { Hello };
