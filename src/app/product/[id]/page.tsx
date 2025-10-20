import Detail from "@/components/Product/Detail";
import { ProductError } from "@/components/Product/Error";
import { getProductById } from "@/services/Products/api/getProductById";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    const product = await getProductById(id);

    if (!product) return <ProductError />;

    return <Detail product={product} />;
  } catch {
    console.error("Error fetching product");
    return <ProductError />;
  }
}
