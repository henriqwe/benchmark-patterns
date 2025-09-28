import React from "react";
import type { TabKey } from "./types";
import { TabButton } from "./components/core/TabButton";
import { CatalogComposition } from "./pages/CatalogComposition";
import { CatalogPresentationalContainer } from "./pages/CatalogPresentationalContainer";
import { CatalogHOC } from "./pages/CatalogHOC";
import { CatalogRenderProps } from "./pages/CatalogRenderProps";
import { CatalogCompound } from "./pages/CatalogCompound";

/**
 * Mini‑benchmark (workbench) para medir métricas em 5 padrões de componentes.
 * Requisito comum: Catálogo de Produtos com busca, filtros, sort, paginação,
 * estados de loading/erro/retry, modal de detalhes e wishlist local.
 *
 * Padrões implementados:
 *  1) Composition
 *  2) Presentational & Container
 *  3) HOC (Higher‑Order Components)
 *  4) Render Props
 *  5) Compound Components
 *
 * Observações:
 *  - Código intencionalmente separado por padrão para permitir comparação.
 *  - Sem libs externas (além de React). Estilos simples via classes utilitárias.
 *  - Fake API com latência 100–500ms e falha aleatória ~10%.
 */

export default function App() {
  const [tab, setTab] = React.useState<TabKey>("composition");
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Mini-Benchmark - Catálogo de Produtos
      </h1>
      <div className="flex gap-2 mb-4 flex-wrap">
        <TabButton current={tab} k="composition" setTab={setTab}>
          Composition
        </TabButton>
        <TabButton current={tab} k="presentational" setTab={setTab}>
          Presentational/Container
        </TabButton>
        <TabButton current={tab} k="hoc" setTab={setTab}>
          HOC
        </TabButton>
        <TabButton current={tab} k="renderprops" setTab={setTab}>
          Render Props
        </TabButton>
        <TabButton current={tab} k="compound" setTab={setTab}>
          Compound Components
        </TabButton>
      </div>
      <div className="space-y-6">
        {tab === "composition" && <CatalogComposition />}
        {tab === "presentational" && <CatalogPresentationalContainer />}
        {tab === "hoc" && <CatalogHOC />}
        {tab === "renderprops" && <CatalogRenderProps />}
        {tab === "compound" && <CatalogCompound />}
      </div>
    </div>
  );
}
