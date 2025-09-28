import type { QueryParams } from "../../../types";

export function SortSelect({
  value,
  onChange,
}: {
  value: QueryParams["sort"];
  onChange: (v: QueryParams["sort"]) => void;
}) {
  return (
    <label className="text-sm font-medium">
      Ordenar
      <select
        className="block border rounded-lg px-3 py-2 w-56"
        value={value}
        onChange={(e) => onChange(e.target.value as QueryParams["sort"])}
      >
        <option value="price_asc">Preço ↑</option>
        <option value="price_desc">Preço ↓</option>
        <option value="rating_desc">Avaliação ↓</option>
        <option value="rating_asc">Avaliação ↑</option>
      </select>
    </label>
  );
}
