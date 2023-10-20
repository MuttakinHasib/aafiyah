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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../ui/accordion';

const NAVIGATION = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Account',
    children: [
      {
        label: 'Dashboard',
        path: '/dashboard',
      },
      {
        label: 'Edit Profile',
        path: '/dashboard/edit-profile',
      },
      {
        label: 'Order History',
        path: '/dashboard/order-history',
      },
      {
        label: 'Address Book',
        path: '/dashboard/address-book',
      },
      {
        label: 'Edit Address',
        path: '/dashboard/edit-address',
      },
      {
        label: 'Change Password',
        path: '/dashboard/change-password',
      },
    ],
  },
  {
    label: 'Shop',
    path: '/shop',
  },
  {
    label: 'Blog',
    path: '/blog',
  },
  {
    label: 'FAQ',
    path: '/faq',
  },
];

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
          <div className="flex flex-col text-[15px] font-medium space-y-[7px]">
            {NAVIGATION.map((nav, index) => {
              if (nav.children) {
                return (
                  <Accordion type="single" collapsible key={index}>
                    <AccordionItem className="border-none" value={nav.label}>
                      <AccordionTrigger className="py-[7px] px-2 transition duration-300 hover:bg-gray-100">
                        {nav.label}
                      </AccordionTrigger>
                      <AccordionContent className="space-y-1">
                        {nav.children.map((child) => (
                          <SheetClose asChild key={child.label}>
                            <Link
                              href={{ pathname: child.path }}
                              className="py-[7px] px-3 transition duration-300 hover:bg-gray-100 block"
                            >
                              {child.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              }
              return (
                <SheetClose asChild key={nav.label}>
                  <Link
                    href={{ pathname: nav.path }}
                    className="py-[7px] px-2 transition duration-300 hover:bg-gray-100"
                  >
                    {nav.label}
                  </Link>
                </SheetClose>
              );
            })}
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
