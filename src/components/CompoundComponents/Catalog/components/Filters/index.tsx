import { CategoryFilter } from "../../../../CompositionPattern/CategoryFilter";
import { useCatalogCtx } from "../../contexts";

export function CatalogFilters() {
  const { params, setParams } = useCatalogCtx();
  const toggleCat = (c: string) =>
    setParams((p) => ({
      ...p,
      categories: p.categories.includes(c)
        ? p.categories.filter((x) => x !== c)
        : [...p.categories, c],
      page: 1,
    }));
  return <CategoryFilter value={params.categories} onToggle={toggleCat} />;
}
