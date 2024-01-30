import { z } from "zod";

export const productSchema = z.object({
  type: z.enum(["simple", "variant"]),
  name: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(255, { message: "Name must be at most 255 characters long" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(3, { message: "Description must be at least 3 characters long" }),
  sku: z.coerce.string().optional(),
  quantity: z.coerce
    .number()
    .transform((v) => (v === 0 ? undefined : v))
    .optional(),
  price: z.coerce
    .number()
    .transform((v) => (v === 0 ? undefined : v))
    .optional(),
  salePrice: z.coerce
    .number()
    .transform((v) => (v === 0 ? undefined : v))
    .optional(),
  costPrice: z.coerce
    .number()
    .transform((v) => (v === 0 ? undefined : v))
    .optional(),
  taxPrice: z.coerce
    .number()
    .transform((v) => (v === 0 ? undefined : v))
    .optional(),
  categories: z.array(
    z.string({ required_error: "Category is required" }).min(3).max(255)
  ),
  brand: z.string({ required_error: "Brand is required" }).min(3).max(255),
  image: z
    .string({ required_error: "Image is required" })
    .url({ message: "Image must be a valid URL" }),
  gallery: z
    .array(
      z
        .string({ required_error: "Image is required" })
        .url({ message: "Image must be a valid URL" })
    )
    .optional(),
  status: z.enum(["draft", "published", "archived"]),
  tags: z.array(z.string()).optional(),
  dimensions: z.object({
    width: z.coerce
      .number()
      .transform((v) => (v === 0 ? undefined : v))
      .optional(),
    height: z.coerce
      .number()
      .transform((v) => (v === 0 ? undefined : v))
      .optional(),
    weight: z.coerce
      .number()
      .transform((v) => (v === 0 ? undefined : v))
      .optional(),
    length: z.coerce
      .number()
      .transform((v) => (v === 0 ? undefined : v))
      .optional(),
    unit: z.string().optional(),
  }),
  variants: z.array(
    z.object({
      attribute: z.string(),
      values: z.array(z.string()),
      options: z.array(z.string()),
    })
  ),
  variantsOptions: z.array(
    z.object({
      name: z.string({ required_error: "Name is required" }).min(1),
      sku: z.coerce.string({ required_error: "SKU is required" }),
      quantity: z.coerce
        .number({ required_error: "Quantity is required" })
        .nonnegative(),
      price: z.coerce
        .number({ required_error: "Price is required" })
        .nonnegative()
        .optional(),
      salePrice: z.coerce
        .number({ required_error: "Sale price is required" })
        .positive(),
      costPrice: z.coerce
        .number()
        .transform((v) => (v === 0 ? undefined : v))
        .optional(),
      taxPrice: z.coerce
        .number()
        .transform((v) => (v === 0 ? undefined : v))
        .optional(),
    })
  ),
});
