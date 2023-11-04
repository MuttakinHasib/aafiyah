import { IUser } from '@aafiyah/types';
import { api } from '../../api';
import { USERS_ROUTE } from '../../constant';

export const USERS_API = {
  getMe: async (): Promise<IUser> => await api.get(`${USERS_ROUTE}/me`),

  editProfile: async (data: Partial<IUser>): Promise<IUser> =>
    await api.patch(`${USERS_ROUTE}`, data),
};
