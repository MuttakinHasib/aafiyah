import { ILogin, IRegister } from '@aafiyah/types';
import { api } from '../../api';
import { AUTH_ROUTE } from '../../constant';

export const AUTH_API = {
  login: async (data: ILogin) => await api.post(`${AUTH_ROUTE}/login`, data),

  register: async (data: IRegister): Promise<string> =>
    await api.post(`${AUTH_ROUTE}/register`, data),

  logout: async (): Promise<string> => await api.delete(`${AUTH_ROUTE}/logout`),
};
