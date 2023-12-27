"use client";

import { ProductTable, productColumns } from "@/components";
import { IProduct } from "@/types";

import React from "react";

const data: IProduct[] = [];

export const ProductsScreen = () => {
  return (
    <React.Fragment>
      <div className="flex items-center justify-between mb-5"></div>
      <ProductTable columns={productColumns} data={data} />
    </React.Fragment>
  );
};
