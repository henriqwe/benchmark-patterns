import { useCatalogCtx } from "../../contexts";

export function CatalogHeader() {
  const { wishlist } = useCatalogCtx();
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-xl font-semibold">Catálogo (Compound Components)</h2>
      <div className="text-sm">
        Wishlist: <strong>{wishlist.count}</strong>
      </div>
    </div>
  );
}
