import React from 'react';

export const metadata = {
  title: 'Cart',
};

const CartPage = () => {
  return <div className='container py-16'>
    <h3 className='text-center font-bold text-4xl pb-10'>Shopping cart</h3>
    <div className='flex justify-between gap-10'>
      <div className='grow shadow-box bg-white'></div>
      <div className='shrink-0 w-[360px] bg-white shadow-box p-8'>
        <h4 className='text-2xl font-medium pb-2 border-b'>Cart Totals</h4>
      </div>
    </div>
  </div>;
};

export default CartPage;
