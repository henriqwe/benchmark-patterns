import { useCatalogCtx } from "../../contexts";

export function CatalogClear() {
  const { setParams } = useCatalogCtx();
  return (
    <button
      className="border rounded px-3 py-2"
      onClick={() =>
        setParams({
          page: 1,
          pageSize: 10,
          q: "",
          categories: [],
          sort: "price_asc",
        })
      }
    >
      Limpar
    </button>
  );
}
