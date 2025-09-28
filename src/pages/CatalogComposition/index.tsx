import React from "react";
import type { Product, QueryParams } from "../../types";
import { useProducts } from "../../hooks/useProducts";
import { useWishlist } from "../../hooks/useWishlist";
import { SearchInput } from "../../components/CompositionPattern/SearchInput";
import { ProductCard } from "../../components/CompositionPattern/ProductCard";
import { Modal } from "../../components/core/Modal";
import { StarRating } from "../../components/core/StarRating";
import { Pagination } from "../../components/CompositionPattern/Pagination";
import { Layout } from "../../components/CompositionPattern/Layout";
import { Badge } from "../../components/core/Badge";
import { SortSelect } from "../../components/CompositionPattern/ShortSelect";
import { CategoryFilter } from "../../components/CompositionPattern/CategoryFilter";

export function CatalogComposition() {
  const [q, setQ] = React.useState("");
  const [cats, setCats] = React.useState<string[]>([]);
  const [sort, setSort] = React.useState<QueryParams["sort"]>("price_asc");
  const [page, setPage] = React.useState(1);
  const pageSize = 20;
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
      arr.includes(c) ? arr.filter((x) => x !== c) : [...arr, c]
    );

  const header = (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">Catálogo (Composition)</h2>
      <div className="text-sm">
        Wishlist: <strong>{count}</strong>
      </div>
    </div>
  );

  const toolbar = (
    <>
      <SearchInput
        value={q}
        onChange={(v) => {
          setQ(v);
          setPage(1);
        }}
      />
      <SortSelect
        value={sort}
        onChange={(v) => {
          setSort(v);
          setPage(1);
        }}
      />
      <CategoryFilter
        value={cats}
        onToggle={(c) => {
          toggleCat(c);
          setPage(1);
        }}
      />
      <button
        className="border rounded px-3 py-2"
        onClick={() => {
          setQ("");
          setCats([]);
          setSort("price_asc");
          setPage(1);
        }}
      >
        Limpar
      </button>
    </>
  );

  const content = (
    <div>
      {loading && <div className="p-3 border rounded mb-3">Carregando…</div>}
      {error && (
        <div className="p-3 border rounded mb-3 bg-red-50">
          <div className="flex items-center justify-between">
            <span>Erro: {error}</span>
            <button className="border rounded px-2 py-1" onClick={retry}>
              Tentar de novo
            </button>
          </div>
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

  const footer = (
    <div className="flex items-center justify-between">
      <div className="text-sm opacity-80">Total: {total} itens</div>
      <Pagination
        page={page}
        pageSize={pageSize}
        total={total}
        onPage={setPage}
      />
    </div>
  );

  return (
    <Layout
      header={header}
      toolbar={toolbar}
      content={content}
      footer={footer}
    />
  );
}
