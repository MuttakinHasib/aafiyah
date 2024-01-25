import { api } from "@/api";
import { BRANDS } from "@/constants";
import { IBase, IBrand } from "@/types";

export const BRAND_API = {
  getBrands: async (): Promise<IBrand[]> => await api.get(BRANDS),
  createBrand: async (brand: Omit<IBrand, keyof IBase>): Promise<string> =>
    await api.post(BRANDS, brand),
};
