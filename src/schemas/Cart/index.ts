import z from "zod";

import {
  ProductColor,
  ProductColorSchema,
  ProductListItem,
  ProductListItemSchema,
  ProductStorage,
  ProductStorageSchema,
} from "@/schemas/Product/ProductSchema";

export const CartItemSchema = z.object({
  product: ProductListItemSchema,
  color: ProductColorSchema,
  storage: ProductStorageSchema,
  quantity: z.number().int().positive(),
});

export type CartItem = z.infer<typeof CartItemSchema>;

export const validateProduct = (product: ProductListItem) =>
  ProductListItemSchema.parse(product);
export const validateColor = (color: ProductColor) =>
  ProductColorSchema.parse(color);
export const validateStorage = (storage: ProductStorage) =>
  ProductStorageSchema.parse(storage);
