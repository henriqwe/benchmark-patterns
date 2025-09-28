import type { Product, QueryParams } from "../../../../types";

export type CatalogContextType = {
  params: QueryParams;
  setParams: React.Dispatch<React.SetStateAction<QueryParams>>;
  state: {
    items: Product[];
    total: number;
    loading: boolean;
    error: string | null;
    retry: () => void;
  };
  wishlist: { set: Set<string>; toggle: (id: string) => void; count: number };
  modal: { open: Product | null; setOpen: (p: Product | null) => void };
};
