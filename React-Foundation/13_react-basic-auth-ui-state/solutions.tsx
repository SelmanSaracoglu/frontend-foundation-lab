import { useState } from "react";

type Role = "admin" | "viewer";

type User = {
  id: number;
  name: string;
  role: Role;
};

function App() {
  const [user, setUser] =
    useState<User | null>(null);

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === "admin";

  function loginAsViewer() {
    setUser({
      id: 1,
      name: "Zeynep",
      role: "viewer",
    });
  }

  function loginAsAdmin() {
    setUser({
      id: 2,
      name: "Ayse",
      role: "admin",
    });
  }

  function logout() {
    setUser(null);
  }

  return (
    <main>
      {!isAuthenticated ? (
        <section>
          <p>Please login.</p>

          <button onClick={loginAsViewer}>
            Login as Viewer
          </button>

          <button onClick={loginAsAdmin}>
            Login as Admin
          </button>
        </section>
      ) : (
        <section>
          <p>Welcome, {user.name}</p>
          <p>Role: {user.role}</p>

          {isAdmin && (
            <button>Manage Users</button>
          )}

          <button onClick={logout}>
            Logout
          </button>
        </section>
      )}
    </main>
  );
}

export default App;
