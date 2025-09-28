export function CatalogHeaderUI({
  title,
  count,
}: {
  title: string;
  count: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="text-sm">
        Wishlist: <strong>{count}</strong>
      </div>
    </div>
  );
}
