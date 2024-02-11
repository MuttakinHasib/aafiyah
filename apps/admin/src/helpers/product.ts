import { ProductFormFields, productSchema } from "@/validations";
import { isEmpty } from "lodash";
import { z } from "zod";

export const cartesian = (...a: any) =>
  a.reduce((a: any, b: any) =>
    a.flatMap((d: any) => b.map((e: any) => [d, e].flat()))
  );

export const getCartesianProduct = (
  attributes: ProductFormFields["attributes"] = []
): any[] => {
  const values = attributes
    .map((attribute) =>
      attribute.values.map((value) => ({ attribute: attribute.id, value }))
    )
    .filter(Boolean);

  if (isEmpty(values)) return [];

  return cartesian(...values);
};
