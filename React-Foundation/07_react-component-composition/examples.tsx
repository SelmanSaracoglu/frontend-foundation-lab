type PageHeaderProps = {
  title: string;
  description: string;
};

function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  return (
    <header>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
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

type AlertCardProps = {
  message: string;
  severity: string;
};

function AlertCard({
  message,
  severity,
}: AlertCardProps) {
  return (
    <Card>
      <h2>Security Alert</h2>
      <p>{message}</p>
      <p>Severity: {severity}</p>
    </Card>
  );
}

function UserSummary() {
  return (
    <Card>
      <h2>User Summary</h2>
      <p>Name: Ayşe</p>
      <p>Role: SDET</p>
    </Card>
  );
}

function DashboardPage() {
  return (
    <main>
      <PageHeader
        title="Security Dashboard"
        description="Monitor users, alerts, and access activity."
      />

      <AlertCard
        message="Unauthorized login attempt"
        severity="High"
      />

      <UserSummary />
    </main>
  );
}

export default DashboardPage;

