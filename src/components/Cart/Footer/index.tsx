import { ReactNode } from "react";
import { type SizesTypes } from "../types/sizes.types";

export const Footer = ({
  price,
  children,
  size = "sm",
  className,
}: {
  price: number | null;
  children: ReactNode;
  size?: SizesTypes;
  className?: string;
}) => {
  return (
    <footer
      className={`c-cart-footer c-cart-footer--${size}${
        className ? className : ""
      }`}
    >
      {children}
      {price !== null && (
        <div className="c-cart-footer__total">
          <span>TOTAL:</span>
          <strong>{price} EUR</strong>
        </div>
      )}
    </footer>
  );
};
