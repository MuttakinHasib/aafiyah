import { BRANDS } from "@/constants";
import { BRAND_API } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { omit } from "lodash";

type UseBrandOptions = {
  fetch?: boolean;
};

export const useBrand = (options?: UseBrandOptions) => {
  const { fetch = false } = options || {};

  const query = useQuery({
    queryKey: [BRANDS],
    queryFn: BRAND_API.getBrands,
    enabled: fetch,
  });

  return {
    data: {
      brands: query.data || [],
      ...omit(query, ["data"]),
    },
  };
};
