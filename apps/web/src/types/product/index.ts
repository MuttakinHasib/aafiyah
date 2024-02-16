import { ProductFormFields } from "@/validations";
import { IBase, IBrand, ICategory } from "..";

export interface IProduct
  extends IBase,
    Omit<ProductFormFields, "categories" | "brand"> {
  slug: string;
  categories: ICategory[];
  brand: IBrand;
  reviews?: string[];
}
