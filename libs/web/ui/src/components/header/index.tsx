import Link from 'next/link';
import { TopBar } from './topbar';
import Image from 'next/image';
import {
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Navigation } from './navigation';

export const Header = () => {
  return (
    <header className="shadow-[0_1px_3px_rgba(0,_0,_0,_.09)]">
      <TopBar />
      <div className="border-y border">
        <div className="container flex items-center justify-between gap-10">
          <div className="flex items-center gap-10">
            <Link href="/" className="h-24 block aspect-video relative">
              <Image src="/aafiyah-logo.svg" fill alt="Aafiyah Logo" />
            </Link>
            <div className="relative">
              <input
                type="text"
                className="bg-gray-100 border-gray-100 min-w-[512px] px-3 py-2 rounded focus:ring-0 focus:border-gray-300 focus:bg-white focus:outline-none"
                placeholder="Search anything you want"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 cursor-pointer">
                <MagnifyingGlassIcon className="w-6 h-6 stroke-[2px]" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Link
              href="/wishlist"
              className="px-3 py-2 transition duration-300 hover:bg-gray-100 rounded"
            >
              <HeartIcon className="w-9 h-9" />
            </Link>
            <Link
              href="/wishlist"
              className="px-3 py-2 transition duration-300 hover:bg-gray-100 rounded flex items-center gap-3"
            >
              <UserIcon className="w-9 h-9" />
              <div className="-space-y-1">
                <small className="text-gray-500">Hello, Login In</small>
                <div className="text-lg font-medium">My Account</div>
              </div>
            </Link>
            <Link
              href="/wishlist"
              className="px-3 py-2 transition duration-300 hover:bg-gray-100 rounded flex items-center gap-3 relative"
            >
              <small className="absolute top-1 left-9 text-white min-w-[20px] flex items-center justify-center bg-red-500 rounded-full">
                0
              </small>
              <ShoppingBagIcon className="w-9 h-9" />
              <div className="-space-y-1">
                <small className="text-gray-500">Shopping Cart</small>
                <div className="text-lg font-medium">$250</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Navigation />
    </header>
  );
};
