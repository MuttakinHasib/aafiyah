import React, { Dispatch, SetStateAction } from 'react';
import { cn } from '../../../utils';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
  openSearchBar: boolean;
  setOpenSearchBar: Dispatch<SetStateAction<boolean>>;
}

export const MobileSearchBar = ({ openSearchBar, setOpenSearchBar }: Props) => {
  return (
    <div
      className={cn(
        'absolute left-0 right-0 shadow-header z-50 bg-white animate__animated animate__faster',
        openSearchBar ? 'animate__slideInDown' : 'animate__slideOutUp'
      )}
    >
      <div className="container py-2">
        <div className="divide-x flex items-center">
          <div className="relative max-w-lg w-full">
            <input
              type="text"
              className="bg-white w-full border-none px-3 py-2 rounded focus:ring-0 focus:outline-none"
              placeholder="Search anything you want"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 cursor-pointer text-gray-400 transition-colors hover:text-gray-900"
            >
              <MagnifyingGlassIcon className="w-6 h-6 stroke-[2px]" />
            </button>
          </div>
          <button
            onClick={() => setOpenSearchBar(false)}
            className="py-2 px-3 text-gray-400 transition duration-300 hover:bg-gray-100 hover:text-gray-900"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
