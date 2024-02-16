import { api } from "@/api";
import { CATEGORIES } from "@/constants";
import { ICategory } from "@/types";

export const CATEGORY_API = {
  getCategories: async (): Promise<ICategory[]> => await api.get(CATEGORIES),
};
