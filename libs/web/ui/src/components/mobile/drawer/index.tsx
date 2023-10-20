'use client';

import { PropsWithChildren } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../../ui/sheet';
import Link from 'next/link';
import {
  HeartIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

export const Drawer = (props: PropsWithChildren) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{props.children}</SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col h-screen justify-between"
      >
        <div className="space-y-5">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex border-y py-1 justify-center">
            <SheetClose asChild>
              <Link
                href="/"
                className="py-2 px-3 transition duration-300 hover:bg-gray-100 flex items-center flex-col uppercase space-y-1"
              >
                <UserIcon className="w-6 h-6" />
                <strong className="text-[9px] text-gray-500">Account</strong>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/wishlist"
                className="py-2 px-3 transition duration-300 hover:bg-gray-100 flex items-center flex-col uppercase space-y-1"
              >
                <HeartIcon className="w-6 h-6" />
                <strong className="text-[9px] text-gray-500">Wishlist</strong>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/cart"
                className="py-2 px-3 transition duration-300 hover:bg-gray-100 flex items-center flex-col relative uppercase space-y-1"
              >
                <ShoppingBagIcon className="w-6 h-6" />
                <strong className="text-[9px] text-gray-500">Cart</strong>
                <small className="absolute top-0 right-0 text-white min-w-[20px] flex items-center justify-center bg-red-500 rounded-full">
                  0
                </small>
              </Link>
            </SheetClose>
          </div>
        </div>
        <SheetFooter className="border-t py-3 text-center">
          <Link href="tel:8801315873250">
            <strong>+880 1315873250</strong>
          </Link>
          <small className="text-gray-500">Free Call 24/7</small>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
