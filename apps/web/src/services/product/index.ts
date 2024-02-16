import { api } from "@/api";
import { PRODUCTS } from "@/constants";
import { IProduct } from "@/types";

export const PRODUCT_API = {
  getProducts: async (searchQuery?: string): Promise<IProduct[]> =>
    await api.get(PRODUCTS + "?" + searchQuery),
};
