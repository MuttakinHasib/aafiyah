import { IBase } from "..";

export interface ICategory extends IBase {
  name: string;
  description: string;
  slug: string;
  icon: string;
  image: string;
}
