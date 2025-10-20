"use client";

import { useCart } from "@/context/useCart";
import { CartIcon } from "./CartIcon";
import { Container } from "./Container";
import { Footer } from "./Footer";
import Link from "next/link";

export const Cart = () => {
  const { items, loading, removeFromCart, totalPrice, isOpen, setIsOpen } =
    useCart();

  const cartCount = items.length;

  const toggleCart = () => setIsOpen((prev) => !prev);

  return (
    <div className="c-cart">
      <CartIcon count={cartCount} onClick={toggleCart} />
      {isOpen && (
        <Container
          size="sm"
          onClose={toggleCart}
          items={items}
          removeFromCart={removeFromCart}
          loading={loading}
        >
          <Footer price={totalPrice}>
            <Link
              href="/"
              className="c-button c-button--solid"
              onClick={toggleCart}
              title="Continue shopping"
            >
              CONTINUE SHOPPING
            </Link>
            <Link
              href="/cart"
              className="c-button c-button--outlined"
              onClick={toggleCart}
              title="See cart"
            >
              SEE CART
            </Link>
          </Footer>
        </Container>
      )}
    </div>
  );
};
