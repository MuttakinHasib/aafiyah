import { IBase, IProduct } from "..";

export interface IBrand extends IBase {
  name: string;
  logo: string;
  website: string;
  products: IProduct[];
}
