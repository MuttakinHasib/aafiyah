import { IUser } from '../user';

export interface IAddress extends Pick<IUser, 'name' | 'email' | 'phone'> {
  company?: string;
  country: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postcode: number;
  default: boolean;
}
