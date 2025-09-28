import type { TabKey } from "../../../types";

export function TabButton({
  current,
  k,
  setTab,
  children,
}: {
  current: TabKey;
  k: TabKey;
  setTab: (k: TabKey) => void;
  children: React.ReactNode;
}) {
  const active = current === k;
  return (
    <button
      onClick={() => setTab(k)}
      className={`px-3 py-1.5 rounded-xl border ${
        active ? "bg-black text-white" : "bg-white"
      }`}
    >
      {children}
    </button>
  );
}
