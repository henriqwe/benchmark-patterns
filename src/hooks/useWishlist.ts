import React from "react";

export function useWishlist() {
  const [set, setSet] = React.useState<Set<string>>(new Set());
  const toggle = (id: string) =>
    setSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  return { set, toggle, count: set.size };
}
