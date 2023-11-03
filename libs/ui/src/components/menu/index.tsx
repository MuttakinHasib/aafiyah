import { PropsWithChildren } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { fallbackName, useProfile } from '@aafiyah/client';
import { IUser } from '@aafiyah/types';

export function UserMenu({
  children,
  user,
}: PropsWithChildren & { user?: IUser }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 rounded">
        <DropdownMenuLabel className="flex gap-2 items-center px-6 py-2 text-[15px] font-medium transition-colors w-full">
          <Avatar>
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{fallbackName(user?.name)}</AvatarFallback>
          </Avatar>
          <div className="font-normal">
            <h4 className="text-[15px]">{user?.name}</h4>
            <p className="text-sm">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              className="px-6 py-2 text-[15px] font-medium transition-colors w-full"
              href="/dashboard"
            >
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="px-6 py-2 text-[15px] font-medium transition-colors w-full"
              href="/dashboard/edit-profile"
            >
              Edit Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="px-6 py-2 text-[15px] font-medium transition-colors w-full"
              href="/dashboard/order-history"
            >
              Order History
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="px-6 py-2 text-[15px] font-medium transition-colors w-full"
              href="/dashboard/address-book"
            >
              Addresses
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="px-6 py-2 text-[15px] font-medium transition-colors w-full">
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
