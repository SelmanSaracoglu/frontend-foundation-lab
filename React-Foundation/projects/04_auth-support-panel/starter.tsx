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

function useToggle() {
  // fill here
}

function useInput() {
  // fill here
}

type PanelProps = {
  // fill here
};

function Panel(props: PanelProps) {
  return (
    <section>
      {/* fill here */}
    </section>
  );
}

type ActionButtonProps = {
  // fill here
};

function ActionButton(
  props: ActionButtonProps
) {
  return (
    <button>
      {/* fill here */}
    </button>
  );
}

const rolePermissions = {
  // fill here
};

function hasPermission(
  role: Role,
  permission: Permission
) {
  // fill here
}

function App() {
  return (
    <main>
      {/* create auth state, login buttons, support panel, search input, and toggle details */}
    </main>
  );
}

export default App;
