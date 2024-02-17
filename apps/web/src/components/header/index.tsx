"use client";

import Link from "next/link";
import { TopBar } from "./topbar";
import Image from "next/image";
import {
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { UserMenu } from "../menu";
import { useReadLocalStorage } from "usehooks-ts";
import { LOGGED_IN } from "@/constants";
import { useProfile } from "@/hooks";
import Navigation from "./navigation";

export const Header = () => {
  const loggedIn = useReadLocalStorage<boolean>(LOGGED_IN);
  const { data } = useProfile();

  return (
    <header className="shadow-header bg-white hidden xl:block">
      <TopBar />
      <div className="border-y border">
        <div className="container flex items-center justify-between gap-10">
          <div className="flex items-center gap-10 flex-1">
            <Link href="/" className="h-24 block aspect-video relative">
              <Image src="/aafiyah-logo.svg" fill alt="Aafiyah Logo" />
            </Link>
            <div className="relative max-w-lg w-full">
              <input
                type="text"
                className="bg-gray-100 w-full border-gray-100 px-3 py-2 rounded focus:ring-0 focus:border-gray-300 focus:bg-white focus:outline-none"
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
            {loggedIn ? (
              <UserMenu user={data}>
                <button
                  title="Profile Menu"
                  className="px-3 py-2 transition duration-300 hover:bg-gray-100 rounded flex items-center gap-3"
                >
                  <UserIcon className="w-9 h-9" />
                  <span className="-space-y-1">
                    <small className="text-gray-500">
                      Hi, {data?.name?.split(" ")[0]}
                    </small>
                    <p className="text-lg font-medium">My Account</p>
                  </span>
                </button>
              </UserMenu>
            ) : (
              <Link
                href="/login"
                title="Profile Menu"
                className="px-3 py-2 transition duration-300 hover:bg-gray-100 rounded flex items-center gap-3"
              >
                <UserIcon className="w-9 h-9" />
                <span className="-space-y-1">
                  <small className="text-gray-500">Hello, Login In</small>
                  <p className="text-lg font-medium">My Account</p>
                </span>
              </Link>
            )}

            <Link
              href="/cart"
              className="px-3 py-2 transition duration-300 hover:bg-gray-100 rounded flex items-center gap-3 relative"
            >
              <small className="absolute top-1 left-9 text-white min-w-[20px] flex items-center justify-center bg-red-500 rounded-full">
                0
              </small>
              <ShoppingBagIcon className="w-9 h-9" />
              <span className="-space-y-1">
                <small className="text-gray-500">Shopping Cart</small>
                <p className="text-lg font-medium">$250</p>
              </span>
            </Link>
          </div>
        </div>
      </div>
      <Navigation />
    </header>
  );
};
