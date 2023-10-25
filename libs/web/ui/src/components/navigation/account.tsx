'use client'

import React from 'react';
import { NAVIGATION } from '../mobile/drawer';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '../../utils';

export const AccountNavigation = () => {
    const pathname = usePathname()
  return (
    <React.Fragment>
      <h4 className='py-5 px-6 text-xl font-medium hidden md:block'>Navigation</h4>
      {
        NAVIGATION[1]?.children?.map(nav => (
            <Link key={nav.label} className={cn('whitespace-nowrap py-2 text-[15px] hover:bg-gray-100 px-6 block',{'font-medium border-b-4 md:border-none border-brand md:shadow-[inset_3px_0_#e52727]': pathname === nav.path})} href={{pathname: nav.path}}>{nav.label}</Link>
        ))
      }
      <div className='w-full border-b hidden md:block'/>
      <button title='Logout' type='button' className='py-2 outline-none w-full text-left text-[15px] hover:bg-gray-100 px-6 block'>Logout</button>
    </React.Fragment>
  );
};
