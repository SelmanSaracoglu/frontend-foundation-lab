type User = {
  id: number;
  name: string;
  role: string;
};

type UserProfileProps = {
  user: User | null;
};

function UserProfile({ user }: UserProfileProps) {
  if (!user) {
    return (
      <section>
        <h2>User Profile</h2>
        <p>No user selected.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Role: {user.role}</p>
    </section>
  );
}

type SecurityAlert = {
  id: number;
  message: string;
  severity?: string;
};

type SecurityAlertCardProps = {
  alert: SecurityAlert;
};

function SecurityAlertCard({
  alert,
}: SecurityAlertCardProps) {
  return (
    <article>
      <h2>Security Alert</h2>
      <p>{alert.message}</p>
      <p>
        Severity: {alert.severity ?? "Unknown"}
      </p>
    </article>
  );
}

function App() {
  const selectedUser: User | null = null;

  const alert: SecurityAlert = {
    id: 1,
    message: "Suspicious login detected",
  };

  return (
    <main>
      <UserProfile user={selectedUser} />

      <SecurityAlertCard alert={alert} />
    </main>
  );
}

export default App;