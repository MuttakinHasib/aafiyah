import { CATEGORIES } from "@/constants";
import { CATEGORY_API } from "@/services/category";
import { useQuery } from "@tanstack/react-query";
import { omit } from "lodash";

type UseCategoryOptions = {
  fetch?: boolean;
};

export const useCategory = (options?: UseCategoryOptions) => {
  const { fetch = false } = options || {};
  const query = useQuery({
    queryKey: [CATEGORIES],
    queryFn: CATEGORY_API.getCategories,
    enabled: fetch,
  });

  return {
    data: {
      categories: query.data || [],
      ...omit(query, ["data"]),
    },
  };
};
