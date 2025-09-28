import { ProductCard } from "../../../../CompositionPattern/ProductCard";
import { useCatalogCtx } from "../../contexts";

export function CatalogList() {
  const { state, wishlist, modal } = useCatalogCtx();
  const { items } = state;
  const { set: wish, toggle } = wishlist;
  const { setOpen } = modal;
  return (
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
  );
}
