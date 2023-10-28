import React from 'react';

export const metadata = {
  title: 'Order History',
};

const OrderHistoryPage = () => {
  return (
    <div className="shadow-box bg-white">
      <h4 className="py-5 px-8 font-medium text-xl">Order History</h4>
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
            <td className="whitespace-nowrap py-3 text-[15px] px-3">Date</td>
            <td className="whitespace-nowrap py-3 text-[15px] px-3">Status</td>
            <td className="whitespace-nowrap py-3 text-[15px] pl-3 pr-8">
              Total
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryPage;
