import { Back } from "@/components/Back";
import { Skeleton } from "../../Skeleton";
import Link from "next/link";

export const ProductError = () => (
  <div>
    <Back />
    <div className="o-container o-section o-section--inner">
      <div className="o-grid o-grid--two">
        <Skeleton className="c-product-detail__image" />
        <div className="c-product-detail__info">
          <h1>Oops, we couldn’t find the product you’re looking for.</h1>
          <Link href="/" className="c-link">
            Go home
          </Link>
        </div>
      </div>
    </div>
  </div>
);
