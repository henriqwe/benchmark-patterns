export function StarRating({ value }: { value: number }) {
  return (
    <span aria-label={`rating ${value}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < value ? "★" : "☆"}</span>
      ))}
    </span>
  );
}
