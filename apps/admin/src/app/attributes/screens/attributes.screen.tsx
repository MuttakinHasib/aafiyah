"use client";

import { AttributeTable, productColumns } from "@/components";
import { useAttribute } from "@/hooks";
import { IProduct } from "@/types";

import React from "react";

const data: IProduct[] = [];

export const AttributesScreen = () => {
  const { attributes } = useAttribute({ fetch: true });
  return (
    <React.Fragment>
      <div className="flex items-center justify-between mb-5"></div>
      <AttributeTable columns={productColumns} data={data} />
    </React.Fragment>
  );
};
