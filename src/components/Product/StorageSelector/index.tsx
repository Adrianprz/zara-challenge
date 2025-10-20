import { ProductStorage } from "@/schemas/Product/ProductSchema";

export function StorageSelector({
  storageOptions,
  selectedStorage,
  setSelectedStorage,
}: {
  storageOptions: ProductStorage[];
  selectedStorage: ProductStorage | null;
  setSelectedStorage: (storage: ProductStorage) => void;
}) {
  return (
    <div className="c-storage-selector">
      <h3 className="c-storage-selector__title">
        STORAGE ¿HOW MUCH SPACE DO YOU NEED?
      </h3>
      <div className="c-storage-selector__options">
        {storageOptions.map((storage) => (
          <button
            key={storage.capacity}
            onClick={() => setSelectedStorage(storage)}
            className={`c-storage-selector__option ${
              selectedStorage?.capacity === storage.capacity
                ? "c-storage-selector__option--active"
                : ""
            }`}
          >
            {storage.capacity}
          </button>
        ))}
      </div>
    </div>
  );
}
