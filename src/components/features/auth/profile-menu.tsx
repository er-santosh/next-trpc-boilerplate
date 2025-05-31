'use client';

import { FaRightFromBracket } from 'react-icons/fa6';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { APP_ROUTES } from '@/constants/app-routes';

import { Link } from '@/i18n/navigation';

import { authClient } from '@/lib/auth-client';

export function ProfileMenu() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const onLogout = async () => {
    await authClient.signOut();
  };

  if (isPending) return null;

  if (!user)
    return (
      <Button asChild>
        <Link href={APP_ROUTES.AUTH.SIGN_IN}>Get Started</Link>
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.image || ''} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          <FaRightFromBracket className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileMenu;
