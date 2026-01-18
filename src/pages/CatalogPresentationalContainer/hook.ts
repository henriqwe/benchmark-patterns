import React from "react";
import type { Product, QueryParams } from "../../types";
import { useProducts } from "../../hooks/useProducts";
import { useWishlist } from "../../hooks/useWishlist";

export function useCatalogPresentationalContainer() {
  const [q, setQ] = React.useState("");
  const [cats, setCats] = React.useState<string[]>([]);
  const [sort, setSort] = React.useState<QueryParams["sort"]>("price_asc");
  const [page, setPage] = React.useState(1);
  const pageSize = 10;
  const { items, total, loading, error, retry } = useProducts({
    page,
    pageSize,
    q,
    categories: cats,
    sort,
  });
  const { set: wish, toggle, count } = useWishlist();
  const [open, setOpen] = React.useState<Product | null>(null);
  const toggleCat = (c: string) =>
    setCats((arr) =>
      arr.includes(c) ? arr.filter((x) => x !== c) : [...arr, c],
    );

  return {
    setQ,
    items,
    total,
    loading,
    error,
    retry,
    setSort,
    setPage,
    wish,
    toggle,
    count,
    open,
    setOpen,
    toggleCat,
    sort,
    q,
    cats,
    setCats,
    pageSize,
    page,
  };
}
