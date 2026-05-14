import { useState } from "react";

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

function useToggle(initialValue = false) {
  const [isOpen, setIsOpen] =
    useState(initialValue);

  function toggle() {
    setIsOpen(
      (currentValue) => !currentValue
    );
  }

  return {
    isOpen,
    toggle,
  };
}

function useInput() {
  const [value, setValue] =
    useState("");

  function onChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setValue(event.target.value);
  }

  return {
    value,
    onChange,
  };
}

type PanelProps = {
  title: string;
  children: React.ReactNode;
};

function Panel({
  title,
  children,
}: PanelProps) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

type ActionButtonProps = {
  label: string;
  variant: "primary" | "danger";
};

function ActionButton({
  label,
  variant,
}: ActionButtonProps) {
  return (
    <button
      className={`button button-${variant}`}
    >
      {label}
    </button>
  );
}

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

function App() {
  const [user, setUser] =
    useState<User | null>(null);
  const searchInput = useInput();
  const detailsToggle = useToggle();

  const isAuthenticated = user !== null;

  function loginAs(role: Role) {
    setUser({
      id: Date.now(),
      name: role,
      role,
    });
  }

  function logout() {
    setUser(null);
  }

  return (
    <main>
      <h1>Auth Support Panel</h1>

      {!isAuthenticated ? (
        <Panel title="Login">
          <button
            onClick={() =>
              loginAs("viewer")
            }
          >
            Login as Viewer
          </button>

          <button
            onClick={() =>
              loginAs("support")
            }
          >
            Login as Support
          </button>

          <button
            onClick={() =>
              loginAs("admin")
            }
          >
            Login as Admin
          </button>
        </Panel>
      ) : (
        <Panel title="Support Actions">
          <p>Welcome, {user.name}</p>
          <p>Role: {user.role}</p>

          <input
            value={searchInput.value}
            onChange={searchInput.onChange}
            placeholder="Search tickets..."
          />

          <p>
            Current Search:
            {searchInput.value}
          </p>

          {hasPermission(
            user.role,
            "ticket:read"
          ) && (
            <ActionButton
              label="View Tickets"
              variant="primary"
            />
          )}

          {hasPermission(
            user.role,
            "ticket:close"
          ) && (
            <ActionButton
              label="Close Ticket"
              variant="danger"
            />
          )}

          {hasPermission(
            user.role,
            "audit:read"
          ) && (
            <ActionButton
              label="View Audit Logs"
              variant="primary"
            />
          )}

          <button
            onClick={detailsToggle.toggle}
          >
            Toggle Details
          </button>

          {detailsToggle.isOpen && (
            <p>
              Permission count:
              {
                rolePermissions[user.role]
                  .length
              }
            </p>
          )}

          <button onClick={logout}>
            Logout
          </button>
        </Panel>
      )}
    </main>
  );
}

export default App;
