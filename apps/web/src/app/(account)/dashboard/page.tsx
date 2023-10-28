import { Avatar } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { Button } from '@aafiyah/ui';

export const metadata = {
  title: 'Dashboard',
};

const DashboardPage = () => {
  return (
    <Theme>
      <div className="space-y-8 font-roboto">
        <div className="flex gap-8 flex-wrap md:flex-nowrap">
          <div className="p-8 shadow-box bg-white w-full grid place-content-center justify-items-center text-center gap-y-10">
            <div className="space-y-3">
              <Avatar radius="full" size="7" src="" fallback="MH" />
              <div>
                <h4 className="font-semibold">Muttakin Islam Hasib</h4>
                <p className="text-[15px]">muttakinislamhasib@gmail.com</p>
              </div>
            </div>

            <Button variant="secondary" asChild>
              <Link href="/dashboard/edit-profile">Edit Profile</Link>
            </Button>
          </div>
          <div className="p-8 shadow-box bg-white w-full space-y-5">
            <h4 className="font-semibold">Muttakin Islam Hasib</h4>
            <div className="space-y-3">
              <p className="text-[15px]">
                Random Federation
                <br />
                115302, Moscow
                <br />
                ul. Varshavskaya, 15-2-178
              </p>
              <div>
                <small className="text-[13px] text-gray-500">
                  Phone Number
                </small>
                <p className="text-[15px]">+88 01315-873250</p>
              </div>
              <div>
                <small className="text-[13px] text-gray-500">
                  Email Address
                </small>
                <p className="text-[15px]">muttakinislamhasib@gmail.com</p>
              </div>
            </div>
            <Link
              href="/dashboard/edit-address"
              className="hover:underline text-blue-500 inline-block text-[15px]"
            >
              Edit Profile
            </Link>
          </div>
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

export default DashboardPage;
