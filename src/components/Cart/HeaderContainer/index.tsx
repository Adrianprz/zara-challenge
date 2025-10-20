"use client";
import Image from "next/image";

export const HeaderContainer = ({
  numItems,
  onClose,
}: {
  numItems: number;
  onClose?: () => void;
}) => (
  <header className="c-cart__header">
    <h3 className="c-cart__title">{`Cart (${numItems})`}</h3>
    {onClose && (
      <button
        type="button"
        onClick={onClose}
        className="c-cart__close"
        aria-label="Close cart"
      >
        <Image src="/cross.svg" alt="Close cart" width={20} height={20} />
      </button>
    )}
  </header>
);
