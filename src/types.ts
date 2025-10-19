export type TabKey =
  | "composition"
  | "presentational"
  | "hoc"
  | "renderprops"
  | "compound";

export type QueryParams = {
  page: number; // 1‑based
  pageSize: number; // default 10
  q: string; // text search
  categories: string[]; // subset of categories
  sort: "price_asc" | "price_desc" | "rating_desc" | "rating_asc";
};

export type Paged<T> = { items: T[]; total: number };

export type Product = {
  id: string;
  name: string;
  category: "Eletrônicos" | "Livros" | "Roupas" | "Casa" | "Brinquedos";
  price: number; // BRL
  rating: number; // 1..5
  status: Status;
  description: string;
};
export type Status = "in_stock" | "out_of_stock" | "preorder";

export type WithProductsInjected = {
  items: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  retry: () => void;
  params: QueryParams;
  setParams: React.Dispatch<React.SetStateAction<QueryParams>>;
};
