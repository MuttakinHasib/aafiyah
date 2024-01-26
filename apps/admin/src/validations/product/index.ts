import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(255, { message: "Name must be at most 255 characters long" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(3, { message: "Description must be at least 3 characters long" }),
  sku: z
    .string({ required_error: "SKU is required" })
    .min(3, { message: "SKU must be at least 3 characters long" })
    .max(255, { message: "SKU must be at most 255 characters long" })
    .optional(),
  quantity: z
    .number({ required_error: "Quantity is required" })
    .min(0, { message: "Quantity must be at least 0" })
    .optional(),
  price: z.number().min(0, { message: "Price must be at least 0" }).optional(),
  salePrice: z
    .number()
    .min(0, { message: "Sale price must be at least 0" })
    .optional(),
  costPrice: z
    .number()
    .min(0, { message: "Cost price must be at least 0" })
    .optional(),
  taxPrice: z
    .number()
    .min(0, { message: "Tax price must be at least 0" })
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
    width: z
      .number()
      .min(0, { message: "Width must be at least 0" })
      .optional(),
    height: z
      .number()
      .min(0, { message: "Height must be at least 0" })
      .optional(),
    weight: z
      .number()
      .min(0, { message: "Weight must be at least 0" })
      .optional(),
    length: z
      .number()
      .min(0, { message: "Weight must be at least 0" })
      .optional(),
    unit: z.string().optional(),
  }),
});
