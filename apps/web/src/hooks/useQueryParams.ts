import { buildQuery, getQueries } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const setQuery = useCallback(
    <T = Record<string, string | string[]>>(queries: T) => {
      const current = getQueries(searchParams);
      Object.assign(current, queries);
      const query = buildQuery(current);
      replace(`${pathname}?${query}`);
    },
    [pathname, replace, searchParams]
  );

  return { setQuery, queries: getQueries(searchParams) };
};
