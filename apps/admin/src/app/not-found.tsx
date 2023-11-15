import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <p className="text-6xl font-semibold text-primary-500">404</p>
      <p className="mt-2 text-lg">Oopps! Page not found!</p>
      <p className="text-xs">The page you requested was not found</p>
      <Link className="py-2 px-4 bg-primary rounded text-white" href="/">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
