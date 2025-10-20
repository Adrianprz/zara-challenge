import { ProductColor } from "@/schemas/Product/ProductSchema";
import { v4 as uuidv4 } from "uuid";

export function ColorSelector({
  colorOptions,
  selectedColor,
  setSelectedColor,
}: {
  colorOptions: ProductColor[];
  selectedColor: ProductColor | null;
  setSelectedColor: (color: ProductColor) => void;
}) {
  return (
    <div className="c-storage-selector c-storage-selector--small">
      <h3 className="c-storage-selector__title">COLOR. PICK YOUR FAVOURITE.</h3>
      <div className="c-storage-selector__options">
        {colorOptions.map((color) => (
          <button
            key={uuidv4()}
            onClick={() => setSelectedColor(color)}
            className={`c-storage-selector__option ${
              selectedColor?.hexCode === color.hexCode
                ? "c-storage-selector__option--active"
                : ""
            }`}
            style={{ backgroundColor: color.hexCode }}
            title={color.name}
            aria-label={`Color ${color.name}`}
          />
        ))}
      </div>
      {selectedColor && (
        <p className="c-storage-selector__selected">{selectedColor.name}</p>
      )}
    </div>
  );
}
