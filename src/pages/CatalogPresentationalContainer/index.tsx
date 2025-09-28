import React from "react";
import type { Product, QueryParams } from "../../types";
import { useProducts } from "../../hooks/useProducts";
import { useWishlist } from "../../hooks/useWishlist";
import { Modal } from "../../components/core/Modal";
import { StarRating } from "../../components/core/StarRating";
import { CatalogHeaderUI } from "../../components/PresentationalAndContainerPattern/CatalogHeaderUI";
import { ToolbarUI } from "../../components/PresentationalAndContainerPattern/ToolbarUI";
import { FeedbackUI } from "../../components/PresentationalAndContainerPattern/FeebackUI";
import { ListUI } from "../../components/PresentationalAndContainerPattern/ListUI";
import { FooterUI } from "../../components/PresentationalAndContainerPattern/FooterUI/indext";
import { Badge } from "../../components/core/Badge";

export function CatalogPresentationalContainer() {
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

  return (
    <div
      className="p-4 rounded-2xl shadow"
      style={{ background: "#fafafa", border: "1px solid #eee" }}
    >
      <CatalogHeaderUI
        title="Catálogo (Presentational & Container)"
        count={count}
      />
      <ToolbarUI
        q={q}
        onQ={(v) => {
          setQ(v);
          setPage(1);
        }}
        sort={sort}
        onSort={(v) => {
          setSort(v);
          setPage(1);
        }}
        cats={cats}
        onToggleCat={(c) => {
          toggleCat(c);
          setPage(1);
        }}
        onClear={() => {
          setQ("");
          setCats([]);
          setSort("price_asc");
          setPage(1);
        }}
      />
      <FeedbackUI
        loading={loading}
        error={error}
        onRetry={retry}
        empty={!loading && !error && items.length === 0}
      />
      <ListUI
        items={items}
        wish={wish}
        onOpen={setOpen}
        onToggleWish={toggle}
      />
      <FooterUI
        page={page}
        pageSize={pageSize}
        total={total}
        onPage={setPage}
      />
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
