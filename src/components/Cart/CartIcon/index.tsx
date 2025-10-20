import Image from "next/image";
import { CounterBadge } from "../CounterBadge";

interface CartIconProps {
  count: number;
  onClick: () => void;
}

export const CartIcon = ({ count, onClick }: CartIconProps) => (
  <CounterBadge counter={count} toggleButton={onClick}>
    <Image
      key={count > 0 ? "active" : "inactive"}
      src={count > 0 ? "/cartActive.svg" : "/cartInactive.svg"}
      alt="Shopping cart"
      width={18}
      height={18}
    />
  </CounterBadge>
);
