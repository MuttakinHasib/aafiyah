import { Button, Input } from '@aafiyah/ui';
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Cart',
};

const CartPage = () => {
  return (
    <div className="container py-16">
      <h3 className="text-center font-bold text-4xl pb-10">Shopping cart</h3>
      <div className="flex justify-between gap-10 flex-col xl:flex-row">
        <div className="grow shadow-box bg-white overflow-x-auto">
          <table className="table-auto text-left w-full">
            <thead>
              <tr className="border-t">
                <th className="uppercase whitespace-nowrap font-bold py-4 text-[13px] pl-8 pr-3 text-center">
                  Image
                </th>
                <th className="uppercase whitespace-nowrap font-bold py-4 text-[13px] px-3">
                  Product
                </th>
                <th className="uppercase whitespace-nowrap font-bold py-4 text-[13px] px-3 text-right">
                  Price
                </th>
                <th className="uppercase whitespace-nowrap font-bold py-4 text-[13px] px-3 text-center">
                  Quantity
                </th>
                <th className="uppercase whitespace-nowrap font-bold py-4 text-[13px] px-3 text-right">
                  Total
                </th>
                <th className="uppercase whitespace-nowrap font-bold py-4 text-[13px] pl-3 pr-8"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="whitespace-nowrap py-4 text-[15px] pl-8 pr-3">
                  <Image
                    width={80}
                    height={80}
                    src="/images/product.jpeg"
                    alt=""
                  />
                </td>
                <td className="whitespace-nowrap py-4 text-[15px] px-3">
                  <Link
                    className="hover:underline hover:text-blue-600"
                    href="/"
                  >
                    Glossy Gray 19 Aluminium Wheel AR-19
                  </Link>
                </td>
                <td className="whitespace-nowrap py-4 text-[15px] px-3 text-right">
                  $122.4
                </td>
                <td className="whitespace-nowrap py-4 text-[15px] px-3 text-center">
                  <div className="inline-flex items-center border">
                    <Button type="button" variant="secondary">
                      <MinusIcon className="w-5 h-5" />
                    </Button>
                    <Input
                      type="text"
                      className="w-12 inline-flex items-center justify-center whitespace-nowrap rounded-[2px] text-sm font-medium transition-colors h-9 px-1 py-2 focus:ring-0 bg-secondary text-secondary-foreground hover:bg-secondary/50 text-center"
                    />
                    <Button type="button" variant="secondary">
                      <PlusIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 text-[15px] px-3 text-right">
                  $1178.00
                </td>
                <td className="whitespace-nowrap py-4 text-[15px] pl-3 pr-8 text-right">
                  <Button size="icon" variant="ghost">
                    <XMarkIcon className="w-5 h-5" />
                  </Button>
                </td>
              </tr>
              <tr className="border-t">
                <td className="whitespace-nowrap py-4 text-[15px] pl-8 pr-3">
                  <Image
                    width={80}
                    height={80}
                    src="/images/product.jpeg"
                    alt=""
                  />
                </td>
                <td className="whitespace-nowrap py-4 text-[15px] px-3">
                  <Link
                    className="hover:underline hover:text-blue-600"
                    href="/"
                  >
                    Glossy Gray 19 Aluminium Wheel AR-19
                  </Link>
                </td>
                <td className="whitespace-nowrap py-4 text-[15px] px-3 text-right">
                  $122.4
                </td>
                <td className="whitespace-nowrap py-4 text-[15px] px-3 text-center">
                  <div className="inline-flex items-center border">
                    <Button type="button" variant="secondary">
                      <MinusIcon className="w-5 h-5" />
                    </Button>
                    <Input
                      type="text"
                      className="w-12 inline-flex items-center justify-center whitespace-nowrap rounded-[2px] text-sm font-medium transition-colors h-9 px-1 py-2 focus:ring-0 bg-secondary text-secondary-foreground hover:bg-secondary/50 text-center"
                    />
                    <Button type="button" variant="secondary">
                      <PlusIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 text-[15px] px-3 text-right">
                  $1178.00
                </td>
                <td className="whitespace-nowrap py-4 text-[15px] pl-3 pr-8 text-right">
                  <Button size="icon" variant="ghost">
                    <XMarkIcon className="w-5 h-5" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="max-w-[360px] w-full bg-white shadow-box p-8">
          <h4 className="text-2xl font-medium pb-2 border-b">Cart Totals</h4>
          <div className="py-8">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="whitespace-nowrap font-bold text-[15px] text-left">
                    Subtotal
                  </th>
                  <td className="whitespace-nowrap font-normal text-[15px] text-right">
                    $12.5
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="whitespace-nowrap font-bold text-[15px] text-left">
                    Shipping
                  </th>
                  <td className="whitespace-nowrap font-normal text-[15px] text-right">
                    $12.5
                  </td>
                </tr>
                <tr>
                  <th className="pb-2 whitespace-nowrap font-bold text-[15px] text-left">
                    Tax
                  </th>
                  <td className="pb-2 whitespace-nowrap font-normal text-[15px] text-right">
                    $12.5
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t">
                  <th className="whitespace-nowrap font-medium text-xl text-left  pt-3">
                    Total
                  </th>
                  <td className="whitespace-nowrap font-normal text-xl text-right  pt-3">
                    $12.5
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <Button className="w-full" size="lg">
            Process to checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
