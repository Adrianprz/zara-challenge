"use client";

import { createContext, Dispatch, SetStateAction } from "react";

import { CartItem } from "@/schemas/Cart";
import {
  ProductColor,
  ProductListItem,
  ProductStorage,
} from "@/schemas/Product/ProductSchema";

export interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addToCart: (
    product: ProductListItem,
    color: ProductColor,
    storage: ProductStorage
  ) => void;
  removeFromCart: (
    productId: string,
    colorHex: string,
    storageCapacity: string
  ) => void;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
