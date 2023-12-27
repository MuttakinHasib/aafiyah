import { api } from "@/api";
import { CATEGORY_ROUTE } from "@/constants";

export const CATEGORY_API = {
  getCategories: async () => await api.get(CATEGORY_ROUTE),
};
