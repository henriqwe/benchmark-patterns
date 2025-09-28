function Root({ children }: { children: React.ReactNode }) {
  return <div className="tabs">{children}</div>;
}

function Tab({ label }: { label: string }) {
  return <button>{label}</button>;
}

function Panel({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

const Tabs = {
  Root,
  Tab,
  Panel,
};

export function CompoundComponents() {
  return (
    <Tabs.Root>
      <Tabs.Tab label="Tab 1" />
      <Tabs.Panel>Content 1</Tabs.Panel>
    </Tabs.Root>
  );
}
