import { PRODUCTS } from "@/constants";
import { PRODUCT_API } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { omit } from "lodash";
import { useSearchParams } from "next/navigation";
import { getQueries } from "@/utils";

type UseProductOptions = {
  fetch?: boolean;
};

export const useProduct = (options?: UseProductOptions) => {
  const searchParams = useSearchParams();
  const { fetch = false } = options || {};

  const query = useQuery({
    queryKey: [PRODUCTS, getQueries(searchParams)],
    queryFn: async () => await PRODUCT_API.getProducts(searchParams.toString()),
    enabled: fetch,
  });

  return {
    data: {
      products: query.data || [],
      ...omit(query, ["data"]),
    },
  };
};
