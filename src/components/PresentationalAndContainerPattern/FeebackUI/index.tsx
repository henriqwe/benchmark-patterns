export function FeedbackUI({
  loading,
  error,
  onRetry,
  empty,
}: {
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  empty: boolean;
}) {
  return (
    <>
      {loading && <div className="p-3 border rounded mb-3">Carregando…</div>}
      {error && (
        <div className="p-3 border rounded mb-3 bg-red-50 flex items-center justify-between">
          <span>Erro: {error}</span>
          <button className="border rounded px-2 py-1" onClick={onRetry}>
            Tentar de novo
          </button>
        </div>
      )}
      {!loading && !error && empty && (
        <div className="p-3 border rounded">Nenhum resultado</div>
      )}
    </>
  );
}
