import type { Product } from "../../../types";
import { ProductCard } from "../../CompositionPattern/ProductCard";

export function ListUI({
  items,
  wish,
  onOpen,
  onToggleWish,
}: {
  items: Product[];
  wish: Set<string>;
  onOpen: (p: Product) => void;
  onToggleWish: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((p) => (
        <ProductCard
          key={p.id}
          p={p}
          wish={wish.has(p.id)}
          onToggleWish={onToggleWish}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
