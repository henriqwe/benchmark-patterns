import React from "react";
import type { CatalogContextType } from "../../contexts/types";
import { CatalogCtx } from "../../contexts";
import type { Product, QueryParams } from "../../../../../types";
import { useProducts } from "../../../../../hooks/useProducts";
import { useWishlist } from "../../../../../hooks/useWishlist";
import { Modal } from "../../../../core/Modal";
import { Badge } from "../../../../core/Badge";
import { StarRating } from "../../../../core/StarRating";

export function CatalogRoot({ children }: { children: React.ReactNode }) {
  const [params, setParams] = React.useState<QueryParams>({
    page: 1,
    pageSize: 10,
    q: "",
    categories: [],
    sort: "price_asc",
  });
  const state = useProducts(params);
  const wishlist = useWishlist();
  const [open, setOpen] = React.useState<Product | null>(null);
  const value: CatalogContextType = {
    params,
    setParams,
    state,
    wishlist,
    modal: { open, setOpen },
  };
  return (
    <CatalogCtx.Provider value={value}>
      <div
        className="p-4 rounded-2xl shadow"
        style={{ background: "#fafafa", border: "1px solid #eee" }}
      >
        {children}
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
    </CatalogCtx.Provider>
  );
}
