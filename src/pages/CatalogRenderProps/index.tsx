import React from "react";
import type { Product, QueryParams } from "../../types";
import { useWishlist } from "../../hooks/useWishlist";
import { SearchInput } from "../../components/CompositionPattern/SearchInput";
import { Modal } from "../../components/core/Modal";
import { StarRating } from "../../components/core/StarRating";
import { Pagination } from "../../components/CompositionPattern/Pagination";
import { ProductCard } from "../../components/CompositionPattern/ProductCard";
import { Badge } from "../../components/core/Badge";
import { SortSelect } from "../../components/CompositionPattern/ShortSelect";
import { CategoryFilter } from "../../components/CompositionPattern/CategoryFilter";
import { ProductsFetcher } from "../../components/RenderProps/ProductsFetcher";

export function CatalogRenderProps() {
  const [params, setParams] = React.useState<QueryParams>({
    page: 1,
    pageSize: 20,
    q: "",
    categories: [],
    sort: "price_asc",
  });
  const { set: wish, toggle, count } = useWishlist();
  const [open, setOpen] = React.useState<Product | null>(null);
  const setQ = (v: string) => setParams((p) => ({ ...p, q: v, page: 1 }));
  const setSort = (v: QueryParams["sort"]) =>
    setParams((p) => ({ ...p, sort: v, page: 1 }));
  const toggleCat = (c: string) =>
    setParams((p) => ({
      ...p,
      categories: p.categories.includes(c)
        ? p.categories.filter((x) => x !== c)
        : [...p.categories, c],
      page: 1,
    }));
  return (
    <div
      className="p-4 rounded-2xl shadow"
      style={{ background: "#fafafa", border: "1px solid #eee" }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Catálogo (Render Props)</h2>
        <div className="text-sm">
          Wishlist: <strong>{count}</strong>
        </div>
      </div>
      <div className="mb-3 flex gap-3 items-end flex-wrap">
        <SearchInput value={params.q} onChange={setQ} />
        <SortSelect value={params.sort} onChange={setSort} />
        <CategoryFilter value={params.categories} onToggle={toggleCat} />
        <button
          className="border rounded px-3 py-2"
          onClick={() =>
            setParams({
              page: 1,
              pageSize: 20,
              q: "",
              categories: [],
              sort: "price_asc",
            })
          }
        >
          Limpar
        </button>
      </div>
      <ProductsFetcher params={params}>
        {({ items, total, loading, error, retry }) => (
          <>
            {loading && (
              <div className="p-3 border rounded mb-3">Carregando…</div>
            )}
            {error && (
              <div className="p-3 border rounded mb-3 bg-red-50 flex items-center justify-between">
                <span>Erro: {error}</span>
                <button className="border rounded px-2 py-1" onClick={retry}>
                  Tentar de novo
                </button>
              </div>
            )}
            {!loading && !error && items.length === 0 && (
              <div className="p-3 border rounded">Nenhum resultado</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map((p) => (
                <ProductCard
                  key={p.id}
                  p={p}
                  wish={wish.has(p.id)}
                  onToggleWish={toggle}
                  onOpen={setOpen}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="text-sm opacity-80">Total: {total} itens</div>
              <Pagination
                page={params.page}
                pageSize={params.pageSize}
                total={total}
                onPage={(pg) => setParams((p) => ({ ...p, page: pg }))}
              />
            </div>
          </>
        )}
      </ProductsFetcher>
      <Modal open={!!open} onClose={() => setOpen(null)}>
        {open && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <strong>{open.name}</strong>
              <Badge status={open.status} />
            </div>
            <div>Categoria: {open.category}</div>
            <div>Preço: R$ {open.price.toFixed(2)}</div>
            <div>
              Avaliação: <StarRating value={open.rating} />
            </div>
            <p className="opacity-80 text-sm">{open.description}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
