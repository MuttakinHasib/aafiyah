import { ReadonlyURLSearchParams } from "next/navigation";
import queryString from "query-string";

export const getQueries = (searchParams: ReadonlyURLSearchParams) =>
  queryString.parse(searchParams.toString(), { arrayFormat: "comma" });
