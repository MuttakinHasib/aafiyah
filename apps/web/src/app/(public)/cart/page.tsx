import { Button } from '@aafiyah/ui';
import React from 'react';

export const metadata = {
  title: 'Cart',
};

const CartPage = () => {
  return (
    <div className="container py-16">
      <h3 className="text-center font-bold text-4xl pb-10">Shopping cart</h3>
      <div className="flex justify-between gap-10 flex-col xl:flex-row">
        <div className="grow shadow-box bg-white p-8"></div>
        <div className="w-[360px] bg-white shadow-box p-8">
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
