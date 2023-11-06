import { IAddress } from '@aafiyah/types';
import { api } from '../../api';
import { ADDRESSES_ROUTE } from '../../constant';

export const ADDRESSES_API = {
  create: async (data: IAddress): Promise<string> =>
    await api.post(ADDRESSES_ROUTE, data),
};
