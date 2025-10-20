import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/Products/api/getProducts";
import { queryKeys } from "@/services/Products/queries/queryKeys";

export const useProductsQuery = (searchTerm?: string) => {
  return useQuery({
    queryKey: queryKeys.products(searchTerm),
    queryFn: ({ signal }) => getProducts(searchTerm, signal),
    staleTime: 1000 * 60, // keep data before refetch (1 min)
    gcTime: 1000 * 60 * 5, // caché 5 min
  });
};
