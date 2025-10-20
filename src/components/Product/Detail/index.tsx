"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/useCart";
import { StorageSelector } from "../StorageSelector";
import { AddToCartButton } from "@/components/Cart/AddCart";
import { Similar } from "../Similar";
import { Back } from "@/components/Back";
import Specifications from "../Specifications";
import { handleImageError } from "@/utils/handleImageError";
import { ColorSelector } from "../ColorSelector";
import {
  ProductColor,
  ProductDetail,
  ProductStorage,
} from "@/schemas/Product/ProductSchema";
import { useToast } from "@/hooks/useToast";

export default function Detail({ product }: { product: ProductDetail }) {
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<ProductStorage | null>(
    null
  );

  const currentColor = selectedColor ?? product.colorOptions[0];

  const { showToast } = useToast();

  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage) return;

    addToCart(
      {
        id: product.id,
        brand: product.brand,
        name: product.name,
        basePrice: product.basePrice,
        imageUrl: currentColor.imageUrl,
      },
      selectedColor,
      selectedStorage
    );

    showToast({
      title: "New alert!",
      message: `${product.name} product added to cart`,
      type: "success",
      duration: 2500,
    });
  };

  return (
    <>
      <Back />
      <section className="o-container o-section o-section--inner">
        <div className="o-grid o-grid--two">
          <figure
            className="c-product-detail__image"
            data-testid="product-image"
          >
            <Image
              src={currentColor.imageUrl}
              alt={product.name}
              width={480}
              height={640}
              loading="lazy"
              draggable={false}
              onError={handleImageError}
            />
          </figure>

          <div className="c-product-detail__info">
            <h1 className="c-product-detail__title">{product.name}</h1>
            <p className="c-product-detail__price">{`From ${product.basePrice} EUR`}</p>
            <StorageSelector
              storageOptions={product.storageOptions}
              selectedStorage={selectedStorage}
              setSelectedStorage={setSelectedStorage}
            />
            <ColorSelector
              colorOptions={product.colorOptions}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
            <AddToCartButton
              selectedColor={selectedColor}
              selectedStorage={selectedStorage}
              onAddItem={handleAddToCart}
            />
          </div>
        </div>
        <Specifications data={product.specs} />
        <Similar products={product.similarProducts} />
      </section>
    </>
  );
}
