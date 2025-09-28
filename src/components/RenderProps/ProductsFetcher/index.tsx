import { useProducts } from "../../../hooks/useProducts";
import type { Product, QueryParams } from "../../../types";

export function ProductsFetcher({
  params,
  children,
}: {
  params: QueryParams;
  children: (s: {
    items: Product[];
    total: number;
    loading: boolean;
    error: string | null;
    retry: () => void;
  }) => React.ReactNode;
}) {
  const state = useProducts(params);
  return <>{children(state)}</>;
}
