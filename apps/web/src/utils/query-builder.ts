import { ReadonlyURLSearchParams } from "next/navigation";
import queryString from "query-string";

export const getQueries = (
  searchParams: ReadonlyURLSearchParams
): Record<string, any> =>
  queryString.parse(searchParams.toString(), { arrayFormat: "comma" });

export const buildQuery = (queries: Record<string, string | string[]>) =>
  queryString.stringify(queries, { arrayFormat: "comma" });
