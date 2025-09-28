import { Catalog } from "../../components/CompoundComponents/Catalog";

export function CatalogCompound() {
  return (
    <Catalog.Root>
      <Catalog.Header />
      <div className="mb-3 flex gap-3 items-end flex-wrap">
        <Catalog.Search />
        <Catalog.Sort />
        <Catalog.Filters />
        <Catalog.Clear />
      </div>
      <Catalog.Feedback />
      <Catalog.List />
      <Catalog.Footer />
    </Catalog.Root>
  );
}
