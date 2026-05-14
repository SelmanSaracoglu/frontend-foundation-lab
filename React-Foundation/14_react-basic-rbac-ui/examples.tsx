type Role =
  | "admin"
  | "editor"
  | "viewer";

type Permission =
  | "user:read"
  | "user:delete"
  | "course:edit"
  | "audit:read";

type User = {
  id: number;
  name: string;
  role: Role;
};

const rolePermissions: Record<Role, Permission[]> = {
  admin: [
    "user:read",
    "user:delete",
    "course:edit",
    "audit:read",
  ],
  editor: [
    "user:read",
    "course:edit",
  ],
  viewer: [
    "user:read",
  ],
};

function hasPermission(
  role: Role,
  permission: Permission
) {
  return rolePermissions[role].includes(permission);
}

type ActionPanelProps = {
  user: User;
};

function ActionPanel({ user }: ActionPanelProps) {
  const canDeleteUser = hasPermission(
    user.role,
    "user:delete"
  );

  const canEditCourse = hasPermission(
    user.role,
    "course:edit"
  );

  const canReadAuditLogs = hasPermission(
    user.role,
    "audit:read"
  );

  return (
    <section>
      <h2>Actions for {user.name}</h2>

      <button>View Users</button>

      {canDeleteUser && (
        <button>Delete User</button>
      )}

      {canEditCourse && (
        <button>Edit Course</button>
      )}

      {canReadAuditLogs && (
        <button>View Audit Logs</button>
      )}
    </section>
  );
}

function App() {
  const currentUser: User = {
    id: 1,
    name: "Ayşe",
    role: "admin",
  };

  return (
    <main>
      <h1>RBAC UI Example</h1>

      <ActionPanel user={currentUser} />
    </main>
  );
}

export default App;