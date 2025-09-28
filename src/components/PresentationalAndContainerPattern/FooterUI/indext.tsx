import { Pagination } from "../../CompositionPattern/Pagination";

export function FooterUI({
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
  return (
    <div className="flex items-center justify-between mt-3">
      <div className="text-sm opacity-80">Total: {total} itens</div>
      <Pagination
        page={page}
        pageSize={pageSize}
        total={total}
        onPage={onPage}
      />
    </div>
  );
}
