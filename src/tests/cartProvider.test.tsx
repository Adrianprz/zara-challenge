import React from "react";
import { render, act } from "@testing-library/react";
import { CartProvider } from "../providers/CartProvider";
import { CartContext, CartContextType } from "@/context/CartContext";

import { color, product, storage } from "./mocks/product";

describe("CartProvider", () => {
  let contextValue: CartContextType | undefined;

  const TestComponent = () => {
    contextValue = React.useContext(CartContext);
    return null;
  };

  beforeEach(() => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
  });

  it("adds product and calculates total price", () => {
    act(() => {
      contextValue?.addToCart(product, color, storage);
      contextValue?.addToCart(product, color, storage);
    });

    expect(contextValue?.items).toHaveLength(1);
    expect(contextValue?.items[0].quantity).toBe(2);
    expect(contextValue?.totalPrice).toBe(product.basePrice * 2);
  });

  it("removes product from cart", () => {
    act(() => {
      contextValue?.addToCart(product, color, storage);
    });

    expect(contextValue?.items).toHaveLength(1);

    act(() => {
      contextValue?.removeFromCart(product.id, color.hexCode, storage.capacity);
    });

    expect(contextValue?.items).toHaveLength(0);
    expect(contextValue?.totalPrice).toBe(0);
  });
});
