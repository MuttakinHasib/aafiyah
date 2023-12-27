"use client";

import { CategoryTable, categoryColumns } from "@/components/category";
import { ICategory } from "@/types/category";
import React from "react";

const data: ICategory[] = [];

const CategoriesScreen = () => {
  return (
    <React.Fragment>
      <div className="flex items-center justify-between mb-5"></div>
      <CategoryTable columns={categoryColumns} data={data} />
    </React.Fragment>
  );
};

export default CategoriesScreen;
