import type { QueryParams } from "../../../types";
import { CategoryFilter } from "../../CompositionPattern/CategoryFilter";
import { SearchInput } from "../../CompositionPattern/SearchInput";
import { SortSelect } from "../../CompositionPattern/ShortSelect";

export function ToolbarUI({
  q,
  onQ,
  sort,
  onSort,
  cats,
  onToggleCat,
  onClear,
}: {
  q: string;
  onQ: (v: string) => void;
  sort: QueryParams["sort"];
  onSort: (v: QueryParams["sort"]) => void;
  cats: string[];
  onToggleCat: (c: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="mb-3 flex gap-3 items-end flex-wrap">
      <SearchInput value={q} onChange={onQ} />
      <SortSelect value={sort} onChange={onSort} />
      <CategoryFilter value={cats} onToggle={onToggleCat} />
      <button className="border rounded px-3 py-2" onClick={onClear}>
        Limpar
      </button>
    </div>
  );
}
