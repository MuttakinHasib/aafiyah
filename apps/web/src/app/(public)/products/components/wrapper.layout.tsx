"use client";

import { Breadcrumb } from "@/components";
import { ILink } from "@/types";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { ProductsFilter } from "./filter.component";

export const ProductLayoutWrapper = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<ILink[]>([]);

  useEffect(() => {
    const pathnames = pathname
      .slice(1)
      .split("/")
      .map((item) => ({ title: item, url: `/${item}` }));
    setBreadcrumbs(pathnames);
  }, [pathname]);

  return (
    <div className="container">
      <div className="py-5">
        <Breadcrumb items={breadcrumbs} />
      </div>
      <div className="pb-16 pt-[calc(4rem-40px)] flex lg:space-x-8 xxl:space-x-12">
        <ProductsFilter />
        {children}
      </div>
    </div>
  );
};
