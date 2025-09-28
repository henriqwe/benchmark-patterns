function Root({ children }) {
  return <div className="tabs">{children}</div>;
}

function Tab({ label }) {
  return <button>{label}</button>;
}

function Panel({ children }) {
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
