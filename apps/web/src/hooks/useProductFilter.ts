import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useQueryParams } from ".";
import { ensureArrayValues, getQueries } from "@/utils";
import { isEmpty, pick } from "lodash";

type HandleFilterToggle = { name: "categories" | "brands"; slug: string };

interface FilterState {
  categories: string[];
  brands: string[];
  sort: string;
}

const INITIAL_FILTER = {
  categories: [],
  brands: [],
  sort: "",
};

export const useProductFilter = () => {
  const [filter, setFilter] = useState<FilterState>(INITIAL_FILTER);
  const searchParams = useSearchParams();
  const { setQuery } = useQueryParams();

  useEffect(() => {
    const queries = ensureArrayValues<FilterState>(
      pick(getQueries(searchParams), ["brands", "categories"])
    );
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

  const handleSortChange = useCallback(
    (value: string) => {
      setFilter((prev) => ({ ...prev, sort: value }));
    },
    [setFilter]
  );

  return {
    filter,
    handleFilterToggle,
    handleSortChange,
  };
};
