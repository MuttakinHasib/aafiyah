import { ProductFormFields, productSchema } from "@/validations";
import { isEmpty } from "lodash";
import { z } from "zod";

export const cartesian = (...a: any) =>
  a.reduce((a: any, b: any) =>
    a.flatMap((d: any) => b.map((e: any) => [d, e].flat()))
  );

export const getCartesianProduct = (
  variants: ProductFormFields["variants"] = []
): any[] => {
  const values = variants
    .map((variant) =>
      variant.values.map((value) => ({ attribute: variant.attribute, value }))
    )
    .filter(Boolean);

  if (isEmpty(values)) return [];

  return cartesian(...values);
};
