"use client";

import { Container } from "@/components/Cart/Container";
import { Footer } from "@/components/Cart/Footer";
import { useCart } from "@/context/useCart";
import Link from "next/link";

export default function CartPage() {
  const { items, loading, removeFromCart, totalPrice } = useCart();

  return (
    <div className="o-container">
      <Container
        items={items}
        removeFromCart={removeFromCart}
        loading={loading}
        size="lg"
      />
      <Footer price={items.length === 0 ? null : totalPrice} size="lg">
        <div style={{ order: "2" }}>
          <Link href="/" className="c-button c-button--outlined">
            CONTINUE SHOPPING
          </Link>
        </div>
        {items.length > 0 && (
          <div style={{ order: "3" }}>
            <Link href="/" className="c-button c-button--solid c-button--big">
              PAY
            </Link>
          </div>
        )}
      </Footer>
    </div>
  );
}
