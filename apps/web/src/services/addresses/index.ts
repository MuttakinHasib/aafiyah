import { IAddress } from "@/types";
import { api } from "../../api";
import { ADDRESSES_ROUTE } from "../../constant";

export const ADDRESSES_API = {
  create: async (data: IAddress): Promise<string> =>
    await api.post(ADDRESSES_ROUTE, data),

  update: async (data: IAddress): Promise<string> =>
    await api.patch(ADDRESSES_ROUTE, data),

  getAll: async (): Promise<IAddress[]> => await api.get(ADDRESSES_ROUTE),

  getById: async (id: string): Promise<IAddress> =>
    await api.get(ADDRESSES_ROUTE + "/" + id),

  remove: async (id: string): Promise<string> =>
    await api.delete(ADDRESSES_ROUTE + "/" + id),
};
