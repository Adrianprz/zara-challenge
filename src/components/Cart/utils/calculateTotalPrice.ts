import { CartItem } from "@/schemas/Cart";

export const calculateTotalPrice = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.storage.price * item.quantity, 0);
