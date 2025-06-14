import type { User } from 'better-auth';
import { LuBuilding, LuGlobe, LuMail } from 'react-icons/lu';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AccountInfoProps {
  user?: User | null;
}

export function AccountInfo({ user }: AccountInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <LuMail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LuBuilding className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Company</p>
              <p className="text-sm text-muted-foreground">Acme Inc.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LuGlobe className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Website</p>
              <p className="text-sm text-muted-foreground">www.example.com</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
