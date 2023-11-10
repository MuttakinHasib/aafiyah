import { IAddress } from '../address';
import { IBase } from '../base';

export interface IUser extends IBase {
  name: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  addresses: IAddress[];
}
