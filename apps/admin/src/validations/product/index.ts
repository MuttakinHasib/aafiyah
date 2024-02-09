import { z } from "zod";

export const productType = z.enum(["simple", "variant"]);

const commonSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(255, { message: "Name must be at most 255 characters long" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(3, { message: "Description must be at least 3 characters long" }),
  costPrice: z.coerce.number().nonnegative(),
  taxPrice: z.coerce.number().nonnegative(),
  categories: z.array(
    z.string({ required_error: "Category is required" }).min(3).max(255),
    { required_error: "Categories is required" }
  ),
  brand: z.string({ required_error: "Brand is required" }).min(3).max(255),
  image: z.object({
    public_id: z.string({ required_error: "Image is required" }),
    secure_url: z
      .string({ required_error: "Image is required" })
      .url({ message: "Image must be a valid URL" }),
    height: z.coerce.number().nonnegative(),
    width: z.coerce.number().nonnegative(),
  }),
  gallery: z
    .array(
      z
        .string({ required_error: "Image is required" })
        .url({ message: "Image must be a valid URL" })
    )
    .optional(),
  status: z.enum(["draft", "published", "archived"], {
    required_error: "Status is required",
  }),
  tags: z.array(z.string(), { required_error: "Tags is required" }),
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
});

const simple = z.object({
  type: z.literal(productType.enum.simple),
  sku: z.coerce
    .string({ required_error: "SKU is required" })
    .min(3, { message: "SKU must be at least 3 characters long" }),
  quantity: z.coerce
    .number({ required_error: "Quantity is required" })
    .nonnegative(),
  price: z.coerce
    .number({ required_error: "Price is required" })
    .positive({ message: "Price must be greater than 0" }),
  salePrice: z.coerce
    .number({ required_error: "Sale price is required" })
    .positive({ message: "Sale price must be greater than 0" }),
});

const variant = z.object({
  type: z.literal(productType.enum.variant),
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
      options: z.string(),
      sku: z.coerce
        .string({ required_error: "SKU is required" })
        .min(3, { message: "SKU must be at least 3 characters long" }),
      quantity: z.coerce
        .number({ required_error: "Quantity is required" })
        .nonnegative(),
      price: z.coerce
        .number({ required_error: "Price is required" })
        .positive({ message: "Price must be greater than 0" }),
      salePrice: z.coerce
        .number({ required_error: "Sale price is required" })
        .positive({ message: "Sale price must be greater than 0" }),
    })
  ),
});

const typeSchema = z.discriminatedUnion("type", [simple, variant]);

export const productSchema = z.intersection(commonSchema, typeSchema);

type CommonSchema = z.infer<typeof commonSchema>;
type SimpleSchema = z.infer<typeof simple>;
type VariantSchema = z.infer<typeof variant>;

export interface ProductFormFields
  extends CommonSchema,
    Omit<SimpleSchema, "type">,
    Omit<VariantSchema, "type"> {
  type: "simple" | "variant";
}
