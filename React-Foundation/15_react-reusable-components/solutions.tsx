type ButtonProps = {
  label: string;
  variant: "primary" | "danger";
};

function Button({
  label,
  variant,
}: ButtonProps) {
  return (
    <button
      className={`button button-${variant}`}
    >
      {label}
    </button>
  );
}

type EmptyStateProps = {
  title: string;
  message?: string;
};

function EmptyState({
  title,
  message,
}: EmptyStateProps) {
  return (
    <section>
      <h2>{title}</h2>
      {message && <p>{message}</p>}
    </section>
  );
}

type PanelProps = {
  children: React.ReactNode;
};

function Panel({ children }: PanelProps) {
  return <section>{children}</section>;
}

function App() {
  return (
    <main>
      <Panel>
        <EmptyState
          title="No courses found"
          message="Try changing the current filter."
        />
      </Panel>

      <Button
        label="Save Course"
        variant="primary"
      />

      <Button
        label="Delete Course"
        variant="danger"
      />
    </main>
  );
}

export default App;
