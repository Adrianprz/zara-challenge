"use client";

import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { handleImageError } from "@/utils/handleImageError";
import type { CartItem } from "@/schemas/Cart";
import { SizesTypes } from "../types/sizes.types";

interface ItemProps {
  element: CartItem;
  removeFromCart: (
    productId: string,
    colorHexCode: string,
    storageCapacity: string
  ) => void;
  size: SizesTypes;
}

export const Item = ({ element, removeFromCart, size = "sm" }: ItemProps) => {
  const { product, color, storage, quantity } = element;

  const handleRemove = useCallback(() => {
    if (!product?.id || !color?.hexCode || !storage?.capacity) return;
    removeFromCart(product.id, color.hexCode, storage.capacity);
  }, [product?.id, color?.hexCode, storage?.capacity, removeFromCart]);

  const [width, height] = size === "sm" ? [120, 120] : [262, 324];

  return (
    <article className="c-cart__item" aria-label={`Product: ${product.name}`}>
      <div className="c-cart__container">
        <Link
          href={`/product/${product.id}`}
          aria-label={`View details of ${product.name}`}
        >
          <figure className="c-cart__item-image">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={width}
              height={height}
              draggable={false}
              sizes={`(max-width: 768px) ${width}px, ${height}px`}
              onError={handleImageError}
              priority
            />
          </figure>
        </Link>
        <div className="c-cart__item-content">
          <div>
            <Link
              href={`/product/${product.id}`}
              aria-label={`View details of ${product.name}`}
            >
              <p className="c-cart__item-name">{product.name}</p>
              <p className="c-cart__item-meta">
                {storage.capacity} • {color.name}
              </p>
              <p className="c-cart__item-price">
                {storage.price} EUR × {quantity}
              </p>
            </Link>
          </div>
          <button
            type="button"
            className="c-cart__item-remove"
            onClick={handleRemove}
            aria-label={`Remove ${product.name} from cart`}
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
};
