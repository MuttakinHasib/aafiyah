/* eslint-disable @nx/enforce-module-boundaries */
'use client';
import Link from 'next/link';
import { statics } from '../../configs';
import { useProfileQuery } from '@aafiyah/client';
const { categories, navLinks } = statics;

const NavBar = () => {
  const { data } = useProfileQuery();
  return (
    <nav className="hidden md:block bg-gray-800">
      <div className="container flex items-center">
        {/* all categories */}
        <div className="px-8 py-4 flex items-center bg-white text-black border-t border-b border-gray-800 cursor-pointer relative group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>

          <span className="capitalize ml-2">All Categories</span>
          <div className="absolute top-full divide-y left-0 w-full py-3 bg-white shadow-md opacity-0 group-hover:opacity-100 transition duration-500 invisible group-hover:visible z-10">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/shop?category=${category.url}`}
                className="flex items-center px-6 py-3 transition hover:bg-gray-100"
              >
                <img
                  src={category.icon}
                  alt=""
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
        {/* all categories end */}
        <div className="flex items-center justify-between flex-grow pl-12">
          <div className="flex items-center space-x-6 capitalize">
            {navLinks.map((nav, index) => (
              <Link
                key={index}
                href={nav.url}
                className="text-gray-200 hover:text-white transition"
              >
                {nav.name}
              </Link>
            ))}
          </div>
          {data?.me ? (
            <button className="flex items-center gap-3 focus:outline-none group transition">
              <div className="border-2 border-white border-dashed p-1 rounded-full">
                <img
                  src={data.me.avatar}
                  alt=""
                  className="rounded-full w-8 h-8"
                />
              </div>
              <h3 className="group-hover:text-white text-base font-medium text-gray-200 transition">
                {data.me.name}
              </h3>
            </button>
          ) : (
            <Link
              href="/login"
              className="text-gray-200 hover:text-white transition"
            >
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
