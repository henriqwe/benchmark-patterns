import { CATEGORIES } from "../../../mocks/categories";

export function CategoryFilter({
  value,
  onToggle,
}: {
  value: string[];
  onToggle: (cat: string) => void;
}) {
  return (
    <fieldset className="text-sm">
      <legend className="font-medium mb-1">Categorias</legend>
      <div className="flex gap-3 flex-wrap">
        {CATEGORIES.map((c) => (
          <label key={c} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={value.includes(c)}
              onChange={() => onToggle(c)}
            />{" "}
            {c}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
