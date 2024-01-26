import { z } from "zod";
import { IBrand, ICategory } from "..";
import { IBase } from "../base";
import { productSchema } from "@/validations";

interface VariationOption {
  name: string;
  value: string;
}

type Variation = {
  name: string;
  options: VariationOption[];
};

type BrandType<T> = T extends "create" ? string : IBrand;
type CategoriesType<T> = T extends "create" ? string[] : ICategory[];

export interface IProduct<T extends "create" | undefined = undefined>
  extends IBase,
    Omit<z.infer<typeof productSchema>, "categories" | "brand"> {
  slug: string;
  categories: CategoriesType<T>;
  variations: Variation[];
  brand: BrandType<T>;
  reviews?: string[];
}
