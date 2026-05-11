type Alert = {
  id: number;
  message: string;
  severity: string;
};

const alerts: Alert[] = [
  {
    id: 1,
    message: "Unauthorized login attempt",
    severity: "High",
  },
  {
    id: 2,
    message: "API rate limit exceeded",
    severity: "Medium",
  },
  {
    id: 3,
    message: "Password changed",
    severity: "Low",
  },
];

function SecurityAlerts() {
  return (
    <section>
      <h2>Security Alerts</h2>

      {alerts.map((alert) => (
        <div key={alert.id}>
          <p>{alert.message}</p>

          <p>
            Severity: {alert.severity}
          </p>
        </div>
      ))}
    </section>
  );
}

function AuthPanel() {
  const isLoggedIn = true;
  const isAdmin = true;

  return (
    <section>
      {isLoggedIn ? (
        <p>Welcome back</p>
      ) : (
        <p>Please login</p>
      )}

      {isAdmin && (
        <button>
          Open Admin Dashboard
        </button>
      )}
    </section>
  );
}

function App() {
  return (
    <main>
      <AuthPanel />

      <SecurityAlerts />
    </main>
  );
}

export default App;