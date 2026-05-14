type Role =
  | "admin"
  | "support"
  | "viewer";

type Permission =
  | "ticket:read"
  | "ticket:close"
  | "audit:read";

type User = {
  id: number;
  name: string;
  role: Role;
};

const rolePermissions: Record<
  Role,
  Permission[]
> = {
  admin: [
    "ticket:read",
    "ticket:close",
    "audit:read",
  ],
  support: [
    "ticket:read",
    "ticket:close",
  ],
  viewer: ["ticket:read"],
};

function hasPermission(
  role: Role,
  permission: Permission
) {
  return rolePermissions[role].includes(
    permission
  );
}

type SupportPanelProps = {
  user: User;
};

function SupportPanel({
  user,
}: SupportPanelProps) {
  return (
    <section>
      <h2>Support Panel</h2>
      <p>User: {user.name}</p>
      <p>Role: {user.role}</p>

      <button>View Tickets</button>

      {hasPermission(
        user.role,
        "ticket:close"
      ) && (
        <button>Close Ticket</button>
      )}

      {hasPermission(
        user.role,
        "audit:read"
      ) && (
        <button>View Audit Logs</button>
      )}
    </section>
  );
}

function App() {
  const currentUser: User = {
    id: 1,
    name: "Zeynep",
    role: "support",
  };

  return (
    <main>
      <SupportPanel user={currentUser} />
    </main>
  );
}

export default App;
