import { z } from "zod";
import { ProductListItemSchema } from "@/schemas/Product/ProductSchema";
import { API_PRODUCTS_URL } from "@/services/Products/config";
import { fetchWithSchema } from "@/services/fetchWithSchema";

export async function getProducts(searchTerm?: string, signal?: AbortSignal) {
  const url = new URL(API_PRODUCTS_URL);
  if (searchTerm?.trim()) url.searchParams.set("search", searchTerm.trim());

  const products = await fetchWithSchema(
    url.toString(),
    z.array(ProductListItemSchema),
    signal
  );

  if (!searchTerm) return products;

  const term = searchTerm.trim().toLowerCase();
  return products.filter(({ name, brand }) =>
    [name, brand].some((f) => f.toLowerCase().includes(term))
  );
}
