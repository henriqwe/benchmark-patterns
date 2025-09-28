import type { Status } from "../../../types";

export function Badge({ status }: { status: Status }) {
  const color =
    status === "in_stock"
      ? "#16a34a"
      : status === "preorder"
      ? "#d97706"
      : "#dc2626";
  const text =
    status === "in_stock"
      ? "Em estoque"
      : status === "preorder"
      ? "Pré-venda"
      : "Indisponível";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 999,
        background: color + "20",
        color,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {text}
    </span>
  );
}
