import React from "react";
import type { Paged, Product, QueryParams } from "../types";
import { useDebounced } from "./useDebounce";
import { fetchProducts } from "../infra/products";

export function useProducts(params: QueryParams) {
  const [data, setData] = React.useState<Paged<Product>>({
    items: [],
    total: 0,
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const stable = useDebounced(params, 300);
  const fetchNow = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchProducts(stable);
      setData(res);
    } catch (e) {
      setError((e as Error)?.message || "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  }, [stable]);
  React.useEffect(() => {
    fetchNow();
  }, [fetchNow]);
  return { ...data, loading, error, retry: fetchNow };
}
