"use client";

import { InfoResults } from "@/components/InfoResults";
import { ProductListItem } from "@/schemas/Product/ProductSchema";
import { Item } from "../Item";
import { v4 as uuidv4 } from "uuid";
import { GridSkeletons } from "../GridSkeletons";

interface GridProps {
  products?: ProductListItem[];
  isLoading: boolean;
  error?: Error | null;
}

export const Grid = ({ products, isLoading, error }: GridProps) => {
  if (isLoading) return <GridSkeletons />;

  if (error || !products?.length)
    return <InfoResults>Nothing here yet</InfoResults>;

  return (
    <section className="o-grid o-grid--products">
      {products.map((product) => (
        <Item key={uuidv4()} product={product} />
      ))}
    </section>
  );
};
