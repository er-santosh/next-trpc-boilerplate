import { Inter as FontSans, Open_Sans as OpenSans } from 'next/font/google';

export const OPEN_SANS = OpenSans({
  weight: ['300', '400', '600', '700'],
  display: 'fallback',
  subsets: ['latin'],
  variable: '--font-open-sans',
});

export const INTER = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});
