import * as React from "react";

type Props = {
  header: React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode;
};

function Layout({ header, content, footer }: Props) {
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
