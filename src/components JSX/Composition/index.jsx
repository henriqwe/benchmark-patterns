function Layout({ header, content, footer }) {
  return (
    <div>
      <header>{header}</header>
      <main>{content}</main>
      <footer>{footer}</footer>
    </div>
  );
}
export function CompositionPattern() {
  return (
    <Layout
      header={<div>header</div>}
      content={<div>content</div>}
      footer={<div>footer</div>}
    />
  );
}
