type DataFetcherProps = {
  render: (data: string[]) => React.ReactNode;
};
function useFetchData() {
  return [];
}

function DataFetcher({ render }: DataFetcherProps) {
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
