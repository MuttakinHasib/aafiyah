'use client';

import { Avatar } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { Button } from '@aafiyah/ui';
import { fallbackName, useAddress, useProfile } from '@aafiyah/client';
import { isEmpty } from 'lodash';
import { PlusIcon } from '@heroicons/react/24/outline';

const DashboardScreen = () => {
  const { data } = useProfile();
  const { removeAddress } = useAddress();

  return (
    <Theme>
      <div className="space-y-8 font-roboto">
        <div className="flex gap-8 flex-wrap md:flex-nowrap">
          <div className="p-8 shadow-box bg-white w-full grid place-content-center justify-items-center text-center gap-y-10">
            <div className="space-y-3">
              <Avatar
                radius="full"
                size="7"
                src={data?.avatar}
                fallback={fallbackName(data?.name)}
              />
              <div>
                <h4 className="font-semibold">{data?.name}</h4>
                <p className="text-[15px]">{data?.email}</p>
              </div>
            </div>

            <Button variant="secondary" asChild>
              <Link href="/dashboard/edit-profile">Edit Profile</Link>
            </Button>
          </div>
          {isEmpty(data?.addresses) ? (
            <div className="p-8 shadow-box bg-white grid place-content-center justify-items-center text-center gap-y-5 w-full">
              <PlusIcon className="w-16 h-16 text-gray-400 p-1 rounded-full border-2" />
              <Button variant="secondary" asChild>
                <Link href={`/dashboard/address-book/new`}>Add New</Link>
              </Button>
            </div>
          ) : (
            <div className="p-8 shadow-box bg-white w-full space-y-5">
              {data?.addresses[0].isDefault && (
                <div className="absolute top-0 right-0 bg-red-400 text-white text-xs py-1 px-2 font-bold">
                  Default
                </div>
              )}
              <h4 className="font-semibold">{data?.addresses[0].name}</h4>
              <div className="space-y-3">
                <p className="text-[15px]">
                  {data?.addresses[0].apartment &&
                    `${data?.addresses[0].apartment}, `}
                  {data?.addresses[0].street}
                  <br />
                  {data?.addresses[0].city}, {data?.addresses[0].state} -{' '}
                  {data?.addresses[0].postcode}
                </p>
                <div>
                  <small className="text-[13px] text-gray-500">
                    Phone Number
                  </small>
                  <p className="text-[15px]">{data?.addresses[0].phone}</p>
                </div>
                <div>
                  <small className="text-[13px] text-gray-500">
                    Email Address
                  </small>
                  <p className="text-[15px]">{data?.addresses[0].email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={{
                    pathname: `/dashboard/address-book/${data?.addresses[0].id}`,
                  }}
                  className="hover:underline text-blue-500 inline-block text-[15px]"
                >
                  Edit Address
                </Link>
                <button
                  onClick={async () =>
                    await removeAddress(data?.addresses[0].id as string)
                  }
                  className="hover:underline text-blue-500 inline-block text-[15px]"
                >
                  Remove Address
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="shadow-box bg-white">
          <h4 className="py-5 px-8 font-medium text-xl">Recent Orders</h4>
          <table className="table-auto text-left w-full">
            <thead>
              <tr className="border-t">
                <th className="uppercase whitespace-nowrap font-bold py-3 text-[13px] pl-8 pr-3">
                  Number
                </th>
                <th className="uppercase whitespace-nowrap font-bold py-3 text-[13px] px-3">
                  Date
                </th>
                <th className="uppercase whitespace-nowrap font-bold py-3 text-[13px] px-3">
                  Status
                </th>
                <th className="uppercase whitespace-nowrap font-bold py-3 text-[13px] pl-3 pr-8">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="whitespace-nowrap py-3 text-[15px] pl-8 pr-3">
                  Number
                </td>
                <td className="whitespace-nowrap py-3 text-[15px] px-3">
                  Date
                </td>
                <td className="whitespace-nowrap py-3 text-[15px] px-3">
                  Status
                </td>
                <td className="whitespace-nowrap py-3 text-[15px] pl-3 pr-8">
                  Total
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Theme>
  );
};

export default DashboardScreen;
