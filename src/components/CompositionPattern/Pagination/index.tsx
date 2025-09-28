export function Pagination({
  page,
  pageSize,
  total,
  onPage,
}: {
  page: number;
  pageSize: number;
  total: number;
  onPage: (p: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="flex items-center gap-2">
      <button
        className="border px-3 py-1 rounded"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
      >
        Anterior
      </button>
      <span className="text-sm">
        Página {page} / {pages}
      </span>
      <button
        className="border px-3 py-1 rounded"
        disabled={page >= pages}
        onClick={() => onPage(page + 1)}
      >
        Próxima
      </button>
    </div>
  );
}
