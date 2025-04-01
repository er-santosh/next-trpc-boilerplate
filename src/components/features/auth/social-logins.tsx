import { Github } from 'lucide-react';

import { Button } from '@/components/ui/button';

const SocialLogins = () => (
  <div className="grid gap-2">
    <Button variant="outline" className="w-full">
      Sign in with Google
    </Button>
    <Button variant="outline" className="w-full">
      <Github className="mr-2 h-5 w-5" />
      Sign in with GitHub
    </Button>
  </div>
);

export default SocialLogins;
