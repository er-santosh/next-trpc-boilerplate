import Image from 'next/image';

import { Link } from '@/i18n/navigation';

const Logo = () => (
  <Link href="/">
    <Image
      src="/static/images/logo.png"
      alt="Logo"
      width={100}
      height={100}
      className="rounded-md"
    />
  </Link>
);

export default Logo;
