export function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="text-sm font-medium">
      Busca
      <input
        className="block border rounded-lg px-3 py-2 w-60"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Produto…"
      />
    </label>
  );
}
