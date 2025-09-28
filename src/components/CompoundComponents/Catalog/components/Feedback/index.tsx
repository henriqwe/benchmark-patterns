import { useCatalogCtx } from "../../contexts";

export function CatalogFeedback() {
  const { state } = useCatalogCtx();
  const { loading, error, retry } = state;
  const empty = !loading && !error && state.items.length === 0;
  return (
    <>
      {loading && <div className="p-3 border rounded mb-3">Carregando…</div>}
      {error && (
        <div className="p-3 border rounded mb-3 bg-red-50 flex items-center justify-between">
          <span>Erro: {error}</span>
          <button className="border rounded px-2 py-1" onClick={retry}>
            Tentar de novo
          </button>
        </div>
      )}
      {empty && <div className="p-3 border rounded">Nenhum resultado</div>}
    </>
  );
}
