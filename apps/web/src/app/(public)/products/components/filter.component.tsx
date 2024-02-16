import {
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Input,
  Label,
} from "@/components";
import { useBrand, useCategory } from "@/hooks";
import React, { useState } from "react";

export const ProductsFilter = () => {
  const {
    data: { categories },
  } = useCategory({ fetch: true });

  const {
    data: { brands },
  } = useBrand({ fetch: true });

  return (
    <div className="shadow-box lg:w-64 xxl:w-72 bg-white">
      <div className="divide-y">
        <div className="py-5 px-6">
          <h4 className="text-xl font-medium">Filters</h4>
        </div>
        {categories.length > 0 && (
          <Collapsible defaultOpen className="py-2 px-3">
            <CollapsibleTrigger className="py-2 px-3 w-full hover:bg-gray-100 transition duration-300 rounded-sm text-left text-[15px] font-bold">
              Categories
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="py-2 px-3 space-y-2">
                {categories.map((category) => (
                  <Label
                    className="flex items-center space-x-2"
                    htmlFor={category.id}
                    key={category.id}
                  >
                    <Checkbox value={category.slug} id={category.id} />{" "}
                    <span>{category.name}</span>
                  </Label>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
        {brands.length > 0 && (
          <Collapsible defaultOpen className="py-2 px-3">
            <CollapsibleTrigger className="py-2 px-3 w-full hover:bg-gray-100 transition duration-300 rounded-sm text-left text-[15px] font-bold">
              Brands
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="py-2 px-3 space-y-2">
                {brands.map((brand) => (
                  <Label
                    className="flex items-center space-x-2"
                    htmlFor={brand.id}
                    key={brand.id}
                  >
                    <Checkbox value={brand.id} id={brand.id} />
                    <span>{brand.name}</span>
                  </Label>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    </div>
  );
};
