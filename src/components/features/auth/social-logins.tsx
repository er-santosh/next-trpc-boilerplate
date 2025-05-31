'use client';

import { FaGithub, FaGoogle } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';

import { authClient } from '@/lib/auth-client';

interface SocialLoginsProps {
  callbackUrl?: string;
}

const SocialLogins = ({ callbackUrl }: SocialLoginsProps) => {
  const handleSocialLogin = async (provider: 'google' | 'github') => {
    await authClient.signIn.social({
      provider,
      callbackURL: callbackUrl,
    });
  };

  return (
    <div className="grid gap-2">
      <Button onClick={() => handleSocialLogin('google')} variant="outline" className="w-full">
        <FaGoogle className="mr-2 h-5 w-5" />
        Sign in with Google
      </Button>
      <Button onClick={() => handleSocialLogin('github')} variant="outline" className="w-full">
        <FaGithub className="mr-2 h-5 w-5" />
        Sign in with Github
      </Button>
    </div>
  );
};

export default SocialLogins;
