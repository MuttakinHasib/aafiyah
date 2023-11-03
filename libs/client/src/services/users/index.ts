import { IUser } from '@aafiyah/types';
import { api } from '../../api';
import { USERS_ROUTE } from '../../constant';

export const USERS_API = {
  getMe: async (): Promise<IUser> => await api.get(`${USERS_ROUTE}/me`),
};
