'use client';

import React, { PropsWithChildren } from 'react';
import { Sidebar } from '../components/sidebar';
import { Header } from '../components/header';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { capitalize, startCase } from 'lodash';
import { cn } from '@aafiyah/ui';

const RootLayoutWrapper = (props: PropsWithChildren) => {
  const pathname = usePathname();

  const breadcrumbs = pathname.slice(1).split('/');
  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];

  return (
    <main className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-72">
        <Header />
        <div className="px-16 py-10">
          <div className="mb-6 flex flex-col justify-between gap-y-1 sm:flex-row sm:gap-y-0">
            <h3 className="text-xl font-medium">
              {breadcrumbs[0] === ''
                ? 'Dashboard'
                : capitalize(startCase(lastBreadcrumb))}
            </h3>

            <div className="flex items-center gap-x-2">
              <Link href="/" className="text-sm font-medium text-primary">
                Home
              </Link>
              <ChevronRightIcon className="w-5 h-5 text-primary" />
              {breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={index}>
                  <Link
                    href={{
                      pathname: `/${breadcrumbs.slice(0, index + 1).join('/')}`,
                    }}
                    className={cn(
                      'text-sm font-medium',
                      lastBreadcrumb === breadcrumb
                        ? 'text-gray-500'
                        : 'text-primary'
                    )}
                  >
                    {capitalize(startCase(breadcrumb)) || 'Dashboard'}
                  </Link>
                  {breadcrumb !== lastBreadcrumb && (
                    <ChevronRightIcon className="w-5 h-5 text-primary" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          {props.children}
        </div>
      </div>
    </main>
  );
};

export default RootLayoutWrapper;
