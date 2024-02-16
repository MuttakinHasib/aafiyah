import { api } from "@/api";
import { BRANDS } from "@/constants";
import { IBrand } from "@/types";

export const BRAND_API = {
  getBrands: async (): Promise<IBrand[]> => await api.get(BRANDS),
};
