export function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0006",
        display: "grid",
        placeItems: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 16,
          maxWidth: 640,
          width: "90%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <strong>Detalhes</strong>
          <button
            onClick={onClose}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "6px 10px",
            }}
          >
            Fechar
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
