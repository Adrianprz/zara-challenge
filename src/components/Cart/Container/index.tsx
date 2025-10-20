"use client";

import { v4 as uuidv4 } from "uuid";
import { CartItem } from "@/schemas/Cart";
import { InfoResults } from "@/components/InfoResults";
import { Item } from "../Item";
import { ReactNode, useRef } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Skeleton } from "@/components/Skeleton";
import { HeaderContainer } from "../HeaderContainer";
import { SizesTypes } from "../types/sizes.types";

interface ContainerProps {
  onClose?: () => void;
  items: CartItem[];
  removeFromCart: (
    productId: string,
    colorHexCode: string,
    storageCapacity: string
  ) => void;
  className?: string;
  children?: ReactNode;
  loading: boolean;
  size: SizesTypes;
}

export const Container = ({
  onClose,
  items,
  removeFromCart,
  size,
  children,
  loading,
}: ContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const numItems = items.length ?? 0;

  useOutsideClick(ref, () => {
    if (onClose) onClose();
  });

  return (
    <aside
      ref={ref}
      className={`c-cart__panel${size ? ` c-cart__panel--${size}` : ""}`}
      role="dialog"
      aria-modal="true"
    >
      <HeaderContainer numItems={numItems} onClose={onClose} />
      {loading ? (
        <ul className="c-cart__list">
          <div className="c-cart__item">
            <div className="c-cart__container">
              <div className="c-cart__item-image">
                <Skeleton
                  className={size === "sm" ? "w-48 h-64" : "w-262 h-324"}
                />
              </div>
              <div className="c-cart__item-content">
                <div>
                  <Skeleton className="c-cart__item-name h-18 w-48 mb-6" />
                  <Skeleton className="c-cart__item-meta h-18 w-48 mb-6" />
                  <Skeleton className="c-cart__item-price h-18 w-48" />
                </div>
              </div>
              <div className="c-cart__item-remove">
                <Skeleton className="c-cart__item-name h-18 w-48" />
              </div>
            </div>
          </div>
        </ul>
      ) : !items.length ? (
        <InfoResults>
          <p>Nothing here yet</p>
        </InfoResults>
      ) : (
        <>
          <ul className="c-cart__list">
            {items.map((element) => (
              <Item
                size={size}
                key={uuidv4()}
                element={element}
                removeFromCart={removeFromCart}
              />
            ))}
          </ul>
          {children}
        </>
      )}
    </aside>
  );
};
