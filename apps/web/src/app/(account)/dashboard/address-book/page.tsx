import { Button } from '@aafiyah/ui';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: 'Address Book',
};

const AddressBookPage = () => {
  return (
    <div className="flex gap-y-5 flex-wrap lg:flex-nowrap justify-between break-all">
      <div className="p-8 shadow-box bg-white w-[calc((100%_-_0px_-_1px)_/_1)] md:w-[calc((100%_-_16px_-_1px)_/_2)] lg:w-[calc((100%_-_32px_-_1px)_/_3)] grid place-content-center justify-items-center text-center gap-y-5">
        <PlusIcon className="w-16 h-16 text-gray-400 p-1 rounded-full border-2" />
        <Button variant="secondary" asChild>
          <Link href="/dashboard/address-book/new">Add New</Link>
        </Button>
      </div>
      <div className="p-8 shadow-box bg-white w-[calc((100%_-_0px_-_1px)_/_1)] md:w-[calc((100%_-_16px_-_1px)_/_2)] lg:w-[calc((100%_-_32px_-_1px)_/_3)] space-y-5">
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
            <small className="text-[13px] text-gray-500">Phone Number</small>
            <p className="text-[15px]">+88 01315-873250</p>
          </div>
          <div>
            <small className="text-[13px] text-gray-500">Email Address</small>
            <p className="text-[15px]">muttakinislamhasib@gmail.com</p>
          </div>
        </div>
        <Link
          href="/dashboard/address-book/1"
          className="hover:underline text-blue-500 inline-block text-[15px]"
        >
          Edit Address
        </Link>
      </div>
      <div className="p-8 shadow-box bg-white w-[calc((100%_-_0px_-_1px)_/_1)] md:w-[calc((100%_-_16px_-_1px)_/_2)] lg:w-[calc((100%_-_32px_-_1px)_/_3)] space-y-5">
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
            <small className="text-[13px] text-gray-500">Phone Number</small>
            <p className="text-[15px]">+88 01315-873250</p>
          </div>
          <div>
            <small className="text-[13px] text-gray-500">Email Address</small>
            <p className="text-[15px]">muttakinislamhasib@gmail.com</p>
          </div>
        </div>
        <Link
          href="/dashboard/address-book/1"
          className="hover:underline text-blue-500 inline-block text-[15px]"
        >
          Edit Address
        </Link>
      </div>
    </div>
  );
};

export default AddressBookPage;
