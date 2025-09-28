import React from "react";
import type { QueryParams, WithProductsInjected } from "../../../types";
import { useProducts } from "../../../hooks/useProducts";

export function WithProducts<T extends WithProductsInjected>(
  Component: React.ComponentType<T>
) {
  return function WithProducts(props: Omit<T, keyof WithProductsInjected>) {
    const [params, setParams] = React.useState<QueryParams>({
      page: 1,
      pageSize: 20,
      q: "",
      categories: [],
      sort: "price_asc",
    });
    const { items, total, loading, error, retry } = useProducts(params);
    return (
      // @ts-expect-error – inject props
      <Component
        {...props}
        items={items}
        total={total}
        loading={loading}
        error={error}
        retry={retry}
        params={params}
        setParams={setParams}
      />
    );
  };
}
