import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Sidebar = () => {
  return (
    <aside className="fixed w-72 h-screen shadow-lg bg-white">
      <div className="h-20 flex items-center px-4">
        <Link href="/" className="h-full block aspect-video relative">
          <Image src="/aafiyah-logo.svg" fill alt="Aafiyah Logo" />
        </Link>
      </div>
    </aside>
  );
};
