'use client';

import { signIn } from 'next-auth/react';

import { FaGoogle } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';

const SocialLogins = () => (
  <div className="grid gap-2">
    <Button onClick={() => signIn('google')} variant="outline" className="w-full">
      <FaGoogle className="mr-2 h-5 w-5" />
      Sign in with Google
    </Button>
  </div>
);

export default SocialLogins;
