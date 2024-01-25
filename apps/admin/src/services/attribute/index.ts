import { api } from "@/api";
import { ATTRIBUTES } from "@/constants";
import { IAttribute, IBase } from "@/types";

export const ATTRIBUTE_API = {
  getAttributes: async (): Promise<IAttribute[]> => await api.get(ATTRIBUTES),

  createAttribute: async (
    attribute: Omit<IAttribute, keyof IBase>
  ): Promise<string> => await api.post(ATTRIBUTES, attribute),
};
