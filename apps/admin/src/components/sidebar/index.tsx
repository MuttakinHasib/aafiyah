"use client";

import { cn } from "@/utils";
import {
  Cog6ToothIcon,
  CubeIcon,
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { LayoutList } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const navigation = [
  { name: "Dashboard", href: "/", icon: <HomeIcon className="w-5 h-5" /> },
  { name: "Users", href: "/users", icon: <UsersIcon className="w-5 h-5" /> },
  {
    name: "Categories",
    href: "/categories",
    icon: <LayoutList className="w-5 h-5" />,
  },
  {
    name: "Products",
    href: "/products",
    icon: <CubeIcon className="w-5 h-5" />,
  },
  {
    name: "Orders",
    href: "/orders",
    icon: <ShoppingBagIcon className="w-5 h-5" />,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <Cog6ToothIcon className="w-5 h-5" />,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="fixed w-72 h-screen shadow-lg bg-white">
      <div className="h-20 flex items-center px-4">
        <Link href="/" className="h-full block aspect-video relative">
          <Image src="/aafiyah-logo.svg" fill alt="Aafiyah Logo" />
        </Link>
      </div>
      {navigation.map((item) => (
        <Link
          href={{ pathname: item.href }}
          key={item.name}
          className={cn(
            "flex items-center gap-x-2 px-4 py-3 hover:bg-gray-100",
            { "bg-gray-100": pathname === item.href }
          )}
        >
          {item.icon}
          <span className="text-sm font-medium">{item.name}</span>
        </Link>
      ))}
    </aside>
  );
};
