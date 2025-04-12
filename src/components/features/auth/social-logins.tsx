import { FaGithub, FaGoogle } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';

const SocialLogins = () => (
  <div className="grid gap-2">
    <Button variant="outline" className="w-full">
      <FaGoogle className="mr-2 h-5 w-5" />
      Sign in with Google
    </Button>
    <Button variant="outline" className="w-full">
      <FaGithub className="mr-2 h-5 w-5" />
      Sign in with GitHub
    </Button>
  </div>
);

export default SocialLogins;
