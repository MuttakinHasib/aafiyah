'use client';

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

export function UserMenu(props: PropsWithChildren) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{props.children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 rounded">
        <DropdownMenuLabel className="flex gap-2 items-center px-6 py-2 text-[15px] font-medium transition-colors w-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="font-normal">
            <h4 className='text-[15px]'>Muttakin Hasib</h4>
            <p className='text-sm'>hasib@beweddy.com</p>
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
              href="/dashboard/addresses"
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
