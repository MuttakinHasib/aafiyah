import { api } from "@/api";
import { ATTRIBUTES } from "@/constants";
import { IAttribute } from "@/types";

export const ATTRIBUTES_API = {
  getAttributes: async (): Promise<IAttribute[]> => await api.get(ATTRIBUTES),

  createAttribute: async (
    attribute: Omit<IAttribute, "id" | "createdAt" | "updatedAt">
  ): Promise<IAttribute> => await api.post(ATTRIBUTES, attribute),
};
