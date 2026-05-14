type PageTitleProps = {
  title: string;
  subtitle: string;
};

function PageTitle({
  title,
  subtitle,
}: PageTitleProps) {
  return (
    <header>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

type PanelProps = {
  children: React.ReactNode;
};

function Panel({ children }: PanelProps) {
  return <section>{children}</section>;
}

function CourseSummary() {
  return (
    <Panel>
      <h2>React Fundamentals</h2>
      <p>
        Learn component-based UI
        development
      </p>
    </Panel>
  );
}

function SecuritySummary() {
  return (
    <Panel>
      <h2>Security Overview</h2>
      <p>No critical vulnerabilities found</p>
    </Panel>
  );
}

function App() {
  return (
    <main>
      <PageTitle
        title="Dashboard"
        subtitle="Course and security overview"
      />

      <CourseSummary />
      <SecuritySummary />
    </main>
  );
}

export default App;
