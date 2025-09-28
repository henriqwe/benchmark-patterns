function useFetchData() {
  return [];
}

function DataFetcher({ render }) {
  const data = useFetchData();
  return render(data);
}

export function RenderProps() {
  return (
    <DataFetcher
      render={(data) => (
        <ul>
          {data.map((d) => (
            <li>{d}</li>
          ))}
        </ul>
      )}
    />
  );
}
