import Image from 'next/image';

import { APP_ROUTES } from '@/constants/app-routes';

import { Link } from '@/i18n/navigation';

import LogoImg from '@/public/static/images/logo.png';

const Logo = () => (
  <Link href={APP_ROUTES.HOME}>
    <Image
      src={LogoImg}
      alt="Logo"
      width={100}
      height={100}
      className="rounded-md"
      placeholder="blur"
      priority
    />
  </Link>
);

export default Logo;
