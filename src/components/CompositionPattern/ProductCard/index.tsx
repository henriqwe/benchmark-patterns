import type { Product } from "../../../types";
import { Badge } from "../../core/Badge";
import { StarRating } from "../../core/StarRating";

export function ProductCard({
  p,
  onOpen,
  wish,
  onToggleWish,
}: {
  p: Product;
  onOpen: (p: Product) => void;
  wish: boolean;
  onToggleWish: (id: string) => void;
}) {
  return (
    <div className="border rounded-xl p-3 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <strong>{p.name}</strong>
        <Badge status={p.status} />
      </div>
      <div className="flex justify-between text-sm opacity-80">
        <span>Categoria: {p.category}</span>
        <span>
          <StarRating value={p.rating} />
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">R$ {p.price.toFixed(2)}</span>
        <div className="flex gap-2">
          <button
            className="border rounded px-2 py-1"
            onClick={() => onOpen(p)}
          >
            Detalhes
          </button>
          <button
            className={`rounded px-2 py-1 ${
              wish ? "bg-black text-white" : "border"
            }`}
            onClick={() => onToggleWish(p.id)}
          >
            {wish ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
}
