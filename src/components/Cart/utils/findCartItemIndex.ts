import { CartItem } from "@/schemas/Cart";

export const findCartItemIndex = (
  items: CartItem[],
  productId: string,
  colorHex: string,
  storageCapacity: string
) =>
  items.findIndex(
    (item) =>
      item.product.id === productId &&
      item.color.hexCode === colorHex &&
      item.storage.capacity === storageCapacity
  );
