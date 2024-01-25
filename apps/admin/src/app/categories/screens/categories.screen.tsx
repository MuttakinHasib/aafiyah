"use client";

import { CategoryTable, categoryColumns } from "@/components/category";
import { useCategory } from "@/hooks";
import React from "react";

const CategoriesScreen = () => {
  const { data } = useCategory({ fetch: true });
  return (
    <React.Fragment>
      <div className="flex items-center justify-between mb-5"></div>
      <CategoryTable columns={categoryColumns} data={data?.categories || []} />
    </React.Fragment>
  );
};

export default CategoriesScreen;
