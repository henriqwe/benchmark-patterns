import { SearchInput } from "../../../../CompositionPattern/SearchInput";
import { useCatalogCtx } from "../../contexts";

export function CatalogSearch() {
  const { params, setParams } = useCatalogCtx();
  return (
    <SearchInput
      value={params.q}
      onChange={(v) => setParams((p) => ({ ...p, q: v, page: 1 }))}
    />
  );
}
