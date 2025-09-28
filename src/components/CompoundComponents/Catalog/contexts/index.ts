import React from "react";
import type { CatalogContextType } from "./types";

export const CatalogCtx = React.createContext<CatalogContextType | null>(null);

export function useCatalogCtx() {
  const ctx = React.useContext(CatalogCtx);
  if (!ctx)
    throw new Error("Catalog.* deve ser usado dentro de <Catalog.Root>");
  return ctx;
}
