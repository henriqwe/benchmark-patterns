import { SortSelect } from "../../../../CompositionPattern/ShortSelect";
import { useCatalogCtx } from "../../contexts";

export function CatalogSort() {
  const { params, setParams } = useCatalogCtx();
  return (
    <SortSelect
      value={params.sort}
      onChange={(v) => setParams((p) => ({ ...p, sort: v, page: 1 }))}
    />
  );
}
