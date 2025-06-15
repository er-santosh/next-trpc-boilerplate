'use client';

import { FaArrowRight } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';

import { Link } from '@/i18n/navigation';

interface ErrorStateProps {
  message?: string;
  code?: number;
}

const ErrorState = ({ message = 'Something went wrong', code = 500 }: ErrorStateProps) => (
  <main className="flex flex-col gap-3 text-center items-center justify-center">
    <h1 className="text-4xl font-semibold"> {code} </h1>
    <h1 className="special mt-3">{message}</h1>
    <Button asChild>
      <Link href={'/'}>
        Back to Home
        <FaArrowRight />
      </Link>
    </Button>
  </main>
);

export default ErrorState;
