"use client";

import { ReactNode, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

import { findCartItemIndex } from "@/components/Cart/utils/findCartItemIndex";
import { calculateTotalPrice } from "@/components/Cart/utils/calculateTotalPrice";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  CartItem,
  validateColor,
  validateProduct,
  validateStorage,
} from "@/schemas/Cart";
import {
  ProductColor,
  ProductListItem,
  ProductStorage,
} from "@/schemas/Product/ProductSchema";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useLocalStorage<CartItem[]>("cart", []);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const addToCart = (
    product: ProductListItem,
    color: ProductColor,
    storage: ProductStorage
  ) => {
    try {
      validateProduct(product);
      validateColor(color);
      validateStorage(storage);

      setItems((prev) => {
        const index = findCartItemIndex(
          prev,
          product.id,
          color.hexCode,
          storage.capacity
        );
        if (index >= 0) {
          const updated = [...prev];
          updated[index].quantity += 1;
          return updated;
        }
        return [...prev, { product, color, storage, quantity: 1 }];
      });
    } catch (error) {
      console.error("Invalid product data:", error);
    }
  };

  const removeFromCart = (
    productId: string,
    colorHex: string,
    storageCapacity: string
  ) =>
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.color.hexCode === colorHex &&
            item.storage.capacity === storageCapacity
          )
      )
    );

  const totalPrice = calculateTotalPrice(items);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        totalPrice,
        isOpen,
        setIsOpen,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
