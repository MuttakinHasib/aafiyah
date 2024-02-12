import { api } from "@/api";
import { PRODUCTS } from "@/constants";
import { IBase, IProduct } from "@/types";

export const PRODUCT_API = {
  getProducts: async (searchQuery?: string): Promise<IProduct[]> =>
    await api.get(PRODUCTS + "?" + searchQuery),

  createProduct: async (
    product: Omit<IProduct<"create">, keyof IBase | "slug" | "variations">
  ): Promise<string> => await api.post(PRODUCTS, product),
};
