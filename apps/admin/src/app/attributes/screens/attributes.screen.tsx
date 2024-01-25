"use client";

import { AttributeTable } from "@/components";
import { attributeColumns } from "@/components/attribute/columns";
import { useAttribute } from "@/hooks";

import React from "react";

export const AttributesScreen = () => {
  const { data } = useAttribute({ fetch: true });
  return (
    <React.Fragment>
      <div className="flex items-center justify-between mb-5"></div>
      <AttributeTable columns={attributeColumns} data={data.attributes} />
    </React.Fragment>
  );
};
