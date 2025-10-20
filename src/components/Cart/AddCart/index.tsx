import {
  ProductColor,
  ProductStorage,
} from "@/schemas/Product/ProductSchema";

export function AddToCartButton({
  selectedColor,
  selectedStorage,
  onAddItem,
}: {
  selectedColor: ProductColor | null;
  selectedStorage: ProductStorage | null;
  onAddItem: () => void;
}) {
  const enabled = !!(selectedColor && selectedStorage);

  return (
    <button
      type="button"
      onClick={onAddItem}
      disabled={!enabled}
      className={`c-button ${
        enabled ? "c-button--solid" : "c-button--disabled"
      }`}
    >
      Add to cart
    </button>
  );
}
