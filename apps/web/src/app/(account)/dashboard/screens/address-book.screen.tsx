'use client';

import { Button, cn } from '@aafiyah/ui';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useAddress } from '@aafiyah/client';

const AddressBookScreen = () => {
  const { addresses } = useAddress({ fetch: true });

  return (
    <div className={cn('flex gap-[16px] flex-wrap break-words')}>
      <div className="p-8 shadow-box bg-white w-[calc((100%_-_0px_-_1px)_/_1)] md:w-[calc((100%_-_16px_-_1px)_/_2)] lg:w-[calc((100%_-_32px_-_1px)_/_3)] grid place-content-center justify-items-center text-center gap-y-5">
        <PlusIcon className="w-16 h-16 text-gray-400 p-1 rounded-full border-2" />
        <Button variant="secondary" asChild>
          <Link href={`/dashboard/address-book/new`}>Add New</Link>
        </Button>
      </div>
      {addresses.map((address) => (
        <div
          key={address.id}
          className="relative p-8 shadow-box bg-white w-[calc((100%_-_0px_-_1px)_/_1)] md:w-[calc((100%_-_16px_-_1px)_/_2)] lg:w-[calc((100%_-_32px_-_1px)_/_3)] space-y-3"
        >
          {address.isDefault && (
            <div className="absolute top-0 right-0 bg-red-400 text-white text-xs py-1 px-2 font-bold">
              Default
            </div>
          )}
          <h4 className="font-semibold">{address.name}</h4>
          <div className="space-y-3">
            <p className="text-[15px]">
              {address.apartment && `${address.apartment}, `}
              {address.street}
              <br />
              {address.city}, {address.state} - {address.postcode}
            </p>
            <div>
              <small className="text-[13px] text-gray-500">Phone Number</small>
              <p className="text-[15px]">{address.phone}</p>
            </div>
            <div>
              <small className="text-[13px] text-gray-500">Email Address</small>
              <p className="text-[15px]">{address.email}</p>
            </div>
          </div>
          <Link
            href={{
              pathname: `/dashboard/address-book/${address.id}`,
            }}
            className="hover:underline text-blue-500 inline-block text-[15px]"
          >
            Edit Address
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AddressBookScreen;
