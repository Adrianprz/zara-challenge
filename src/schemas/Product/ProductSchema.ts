import z from "zod";

export const ProductListItemSchema = z.object({
  id: z.string(),
  brand: z.string(),
  name: z.string(),
  basePrice: z.number(),
  imageUrl: z.string().url(),
});

export const ProductColorSchema = z.object({
  name: z.string(),
  hexCode: z.string(),
  imageUrl: z.string().url(),
});

export const ProductStorageSchema = z.object({
  capacity: z.string(),
  price: z.number(),
});

export const ProductSpecsSchema = z.object({
  screen: z.string(),
  resolution: z.string(),
  processor: z.string(),
  mainCamera: z.string(),
  selfieCamera: z.string(),
  battery: z.string(),
  os: z.string(),
  screenRefreshRate: z.string().optional(),
});

export const ProductDetailSchema = z.object({
  id: z.string(),
  brand: z.string(),
  name: z.string(),
  description: z.string(),
  basePrice: z.number(),
  rating: z.number(),
  specs: ProductSpecsSchema,
  colorOptions: z.array(ProductColorSchema),
  storageOptions: z.array(ProductStorageSchema),
  similarProducts: z.array(ProductListItemSchema),
});

export type ProductListItem = z.infer<typeof ProductListItemSchema>;
export type ProductColor = z.infer<typeof ProductColorSchema>;
export type ProductStorage = z.infer<typeof ProductStorageSchema>;
export type ProductSpecs = z.infer<typeof ProductSpecsSchema>;
export type ProductDetail = z.infer<typeof ProductDetailSchema>;
