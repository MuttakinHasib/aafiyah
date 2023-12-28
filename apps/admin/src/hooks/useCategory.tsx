import { CATEGORIES } from "@/constants";
import { CATEGORY_API } from "@/services/category";
import { useQuery } from "@tanstack/react-query";

type UseCategoryOptions = {
  fetch?: boolean;
};

export const useCategory = (options?: UseCategoryOptions) => {
  const { fetch = true } = options || {};
  const { data, ...restQuery } = useQuery({
    queryKey: [CATEGORIES],
    queryFn: CATEGORY_API.getCategories,
    enabled: fetch,
  });

  return {
    data: {
      categories: data,
      ...restQuery,
    },
  };
};
