"use client";

import Link from "next/link";
import Image from "next/image";

import { Cart } from "@/components/Cart";

export const Header = () => {
  return (
    <header className="c-header">
      <div className="o-container">
        <div className="c-header__content">
          <Link href="/" title="Home Logo">
            <Image
              src="/logo.svg"
              alt="Home Logo"
              width={74}
              height={24}
              priority
            />
          </Link>
          <Cart />
        </div>
      </div>
    </header>
  );
};
