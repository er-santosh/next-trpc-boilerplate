import { getTranslations } from 'next-intl/server';

const Hello = async () => {
  const t = await getTranslations('Pages.dashboard');

  return (
    <>
      <p>
        👋{' '}
        <span
          dangerouslySetInnerHTML={{
            __html: t('hello_message', { email: 'hello@EXAMPLE.COM' }),
          }}
        />
      </p>
    </>
  );
};

export { Hello };
