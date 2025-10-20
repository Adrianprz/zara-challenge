import { ProductListItem } from "@/schemas/Product/ProductSchema";
import { Item } from "../Item";
import { Carousel } from "@/components/Carousel";
import { v4 as uuidv4 } from "uuid";

export function Similar({ products }: { products: ProductListItem[] }) {
  return (
    <div className="c-similar">
      <h2 className="c-similar__title">SIMILAR ITEMS</h2>
      <Carousel>
        {products.map((p) => (
          <Item product={p} key={uuidv4()} />
        ))}
      </Carousel>
    </div>
  );
}
