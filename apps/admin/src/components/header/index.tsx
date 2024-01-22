import React from "react";
import { SunIcon } from "@heroicons/react/24/outline";
import { Input } from "../form";
import { Avatar, AvatarFallback, AvatarImage } from "..";
import { PanelRightOpen } from "lucide-react";

export const Header = () => {
  return (
    <header className="px-6 py-3 shadow-md flex items-center justify-between gap-10 bg-white sticky top-0 z-50">
      <div className="flex flex-1 items-center space-x-5">
        <button>
          <PanelRightOpen className="w-6 h-6" />
        </button>
        <Input className="max-w-xs" placeholder="Search here" />
      </div>
      <div className="flex items-center space-x-5">
        <button className="hover:text-black text-gray-500 transition-colors duration-300">
          <SunIcon className="w-8 h-8" />
        </button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
