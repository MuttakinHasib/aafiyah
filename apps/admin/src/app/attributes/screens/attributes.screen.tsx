"use client";

import { AttributeTable, productColumns } from "@/components";
import { IProduct } from "@/types";

import React from "react";

const data: IProduct[] = [];

export const AttributesScreen = () => {
  return (
    <React.Fragment>
      <div className="flex items-center justify-between mb-5"></div>
      <AttributeTable columns={productColumns} data={data} />
    </React.Fragment>
  );
};
