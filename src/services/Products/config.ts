export const API_BASE_URL =
  "https://prueba-tecnica-api-tienda-moviles.onrender.com/";

export const API_PRODUCTS_URL = API_BASE_URL + "products";

export const API_PRODUCT_URL = (id: string | number) =>
  `${API_BASE_URL}products/${id}`;

export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
