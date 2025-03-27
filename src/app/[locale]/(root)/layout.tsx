import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { siteConfig } from '@/config/app-config';

import { BaseTemplate } from '@/templates/base-template';

const Layout = (props: { children: React.ReactNode }) => {
  const t = useTranslations('RootLayout');

  return (
    <BaseTemplate
      leftNav={
        <>
          <li>
            <Link href="/" className="border-none text-gray-700 hover:text-gray-900">
              {t('home_link')}
            </Link>
          </li>

          <li>
            <Link href="/about/" className="border-none text-gray-700 hover:text-gray-900">
              {t('about_link')}
            </Link>
          </li>
          <li>
            <Link href="/guestbook/" className="border-none text-gray-700 hover:text-gray-900">
              {t('guestbook_link')}
            </Link>
          </li>
          <li>
            <Link href="/portfolio/" className="border-none text-gray-700 hover:text-gray-900">
              {t('portfolio_link')}
            </Link>
          </li>
          <li>
            <Link href="/dashboard/" className="border-none text-gray-700 hover:text-gray-900">
              {t('protected_link')}
            </Link>
          </li>
          <li>
            <a
              className="border-none text-gray-700 hover:text-gray-900"
              href={siteConfig.github.repoLink}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
        </>
      }
      rightNav={
        <>
          <li>
            <Link href="/signin/" className="border-none text-gray-700 hover:text-gray-900">
              {t('sign_in_link')}
            </Link>
          </li>

          <li></li>
        </>
      }
    >
      <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
    </BaseTemplate>
  );
};

export default Layout;
