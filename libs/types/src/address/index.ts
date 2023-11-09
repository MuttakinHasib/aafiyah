import { IBase } from '../base';
import { IUser } from '../user';

export interface IAddress
  extends Pick<IUser, 'name' | 'email' | 'phone'>,
    IBase {
  company?: string;
  country: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postcode: number;
  isDefault: boolean;
}
