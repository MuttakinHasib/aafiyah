import {
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Input,
  Label,
} from "@/components";
import { useBrand, useCategory, useQueryParams } from "@/hooks";
import { buildQuery, ensureArrayValues, getQueries } from "@/utils";
import { isEmpty } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

type HandleFilterToggle = { name: "categories" | "brands"; slug: string };

interface FilterState {
  categories: string[];
  brands: string[];
}

const INITIAL_FILTER = {
  categories: [],
  brands: [],
};

export const ProductsFilter = () => {
  const [filter, setFilter] = useState<FilterState>(INITIAL_FILTER);
  const searchParams = useSearchParams();
  const { setQuery } = useQueryParams();

  const {
    data: { categories },
  } = useCategory({ fetch: true });

  const {
    data: { brands },
  } = useBrand({ fetch: true });

  useEffect(() => {
    const queries = ensureArrayValues<FilterState>(getQueries(searchParams));
    setFilter(isEmpty(queries) ? INITIAL_FILTER : queries);
  }, [searchParams]);

  useEffect(() => {
    setQuery(filter);
  }, [filter, setQuery]);

  const handleFilterToggle = useCallback(
    ({ slug, name }: HandleFilterToggle) => {
      if (filter[name]?.includes(slug)) {
        setFilter((prev) => ({
          ...prev,
          [name]: prev[name].filter((item) => item !== slug),
        }));
      } else {
        setFilter((prev) => ({
          ...prev,
          [name]: [...(isEmpty(prev[name]) ? [] : prev[name]), slug],
        }));
      }
    },
    [filter]
  );

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
                    <Checkbox
                      name="categories"
                      value={category.slug}
                      id={category.id}
                      onCheckedChange={() =>
                        handleFilterToggle({
                          name: "categories",
                          slug: category.slug,
                        })
                      }
                      checked={filter["categories"]?.includes(category.slug)}
                    />{" "}
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
                    <Checkbox
                      name="categories"
                      // TODO: Fix the value to be brand.slug
                      value={brand.id}
                      id={brand.id}
                      onCheckedChange={() =>
                        handleFilterToggle({
                          name: "brands",
                          // TODO: Fix the value to be brand.slug
                          slug: brand.id,
                        })
                      }
                      // TODO: Fix the value to be brand.slug
                      checked={filter["brands"]?.includes(brand.id)}
                    />
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
