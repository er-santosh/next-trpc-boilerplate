import type { User } from 'better-auth';
import { LuCamera } from 'react-icons/lu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { getNameInitials } from '@/utils/get-name-initials';

interface AccountHeaderProps {
  user?: User | null;
}

export function AccountHeader({ user }: AccountHeaderProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
              <AvatarImage src={user?.image || '/placeholder.svg'} alt={user?.name} />
              <AvatarFallback className="text-lg sm:text-xl">
                {getNameInitials(user?.name || '')}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="outline"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
            >
              <LuCamera className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold">{user?.name}</h1>
            </div>

            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
