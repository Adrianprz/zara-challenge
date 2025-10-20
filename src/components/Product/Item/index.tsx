import Link from "next/link";
import Image from "next/image";

import { ProductListItem } from "@/schemas/Product/ProductSchema";
import { handleImageError } from "@/utils/handleImageError";

export const Item = ({ product }: { product: ProductListItem }) => {
  return (
    <article className="o-card c-product-card">
      <Link
        href={`/product/${product.id}`}
        className="c-product-card__link"
        title={`Go to ${product.name} details`}
        draggable={false}
      >
        <figure className="o-media">
          <Image
            src={product.imageUrl}
            alt={product.name}
            draggable={false}
            onError={handleImageError}
            fill
            priority
            // loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </figure>
        <div className="o-card__body">
          <div>
            <p className="c-product-card__brand">{product.brand}</p>
            <h3 className="c-product-card__name">{product.name}</h3>
          </div>
          <div>
            <p className="c-product-card__price">{product.basePrice} EUR</p>
          </div>
        </div>
      </Link>
    </article>
  );
};
