import { Pagination } from "../../../../CompositionPattern/Pagination";
import { useCatalogCtx } from "../../contexts";

export function CatalogFooter() {
  const { params, setParams, state } = useCatalogCtx();
  return (
    <div className="flex items-center justify-between mt-3">
      <div className="text-sm opacity-80">Total: {state.total} itens</div>
      <Pagination
        page={params.page}
        pageSize={params.pageSize}
        total={state.total}
        onPage={(pg) => setParams((p) => ({ ...p, page: pg }))}
      />
    </div>
  );
}
