import { ProductDetailSchema } from "@/schemas/Product/ProductSchema";
import { fetchWithSchema } from "@/services/fetchWithSchema";
import { API_PRODUCT_URL } from "../config";

export async function getProductById(id: string, signal?: AbortSignal) {
  return fetchWithSchema(API_PRODUCT_URL(id), ProductDetailSchema, signal);
}
