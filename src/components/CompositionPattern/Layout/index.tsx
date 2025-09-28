export function Layout({
  header,
  toolbar,
  content,
  footer,
}: {
  header?: React.ReactNode;
  toolbar?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div
      className="p-4 rounded-2xl shadow"
      style={{ background: "#fafafa", border: "1px solid #eee" }}
    >
      {header && <div className="mb-3">{header}</div>}
      {toolbar && (
        <div className="mb-3 flex gap-3 items-end flex-wrap">{toolbar}</div>
      )}
      <div className="mb-3">{content}</div>
      {footer && <div className="mt-3">{footer}</div>}
    </div>
  );
}
