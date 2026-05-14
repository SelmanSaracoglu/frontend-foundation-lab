type BadgeVariant =
  | "success"
  | "warning"
  | "danger";

type BadgeProps = {
  label: string;
  variant: BadgeVariant;
};

function Badge({ label, variant }: BadgeProps) {
  return (
    <span className={`badge badge-${variant}`}>
      {label}
    </span>
  );
}

type AlertProps = {
  title: string;
  message?: string;
  variant: BadgeVariant;
};

function Alert({
  title,
  message,
  variant,
}: AlertProps) {
  return (
    <section className="alert">
      <Badge
        label={variant}
        variant={variant}
      />

      <h2>{title}</h2>

      {message && <p>{message}</p>}
    </section>
  );
}

type CardProps = {
  children: React.ReactNode;
};

function Card({ children }: CardProps) {
  return (
    <section className="card">
      {children}
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>Reusable Components</h1>

      <Card>
        <Alert
          title="Login successful"
          message="Welcome back."
          variant="success"
        />
      </Card>

      <Card>
        <Alert
          title="Suspicious login detected"
          message="Review recent account activity."
          variant="warning"
        />
      </Card>

      <Card>
        <Alert
          title="Account blocked"
          variant="danger"
        />
      </Card>
    </main>
  );
}

export default App;