import { DATASET } from "../mocks/dataset";
import type { Paged, Product, QueryParams } from "../types";
import { rand } from "../utils/rand";

export async function fetchProducts(
  params: QueryParams
): Promise<Paged<Product>> {
  const { page, pageSize, q, categories, sort } = params;
  // simulate latency
  const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
  await wait(rand(100, 500));
  if (Math.random() < 0.1) {
    throw new Error("Network error: simulated failure");
  }
  // filter
  let items = DATASET.filter((p) => {
    const text = q.trim().toLowerCase();
    const okText = !text || p.name.toLowerCase().includes(text);
    const okCat = categories.length === 0 || categories.includes(p.category);
    return okText && okCat;
  });
  // sort
  items = items.sort((a, b) => {
    switch (sort) {
      case "price_asc":
        return a.price - b.price;
      case "price_desc":
        return b.price - a.price;
      case "rating_asc":
        return a.rating - b.rating;
      case "rating_desc":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
  const total = items.length;
  // paginate
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return { items: items.slice(start, end), total };
}
