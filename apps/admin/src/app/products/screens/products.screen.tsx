'use client';

import { IProduct } from '@aafiyah/types';
import { ProductTable, productColumns } from '../../../components/product';

import React from 'react';

const data: IProduct[] = [];

export const ProductsScreen = () => {
  return (
    <React.Fragment>
      <div className="flex items-center justify-between mb-5"></div>
      <ProductTable columns={productColumns} data={data} />
    </React.Fragment>
  );
};
