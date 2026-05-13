import { useState } from "react";

type UserRole = "admin" | "user";

type User = {
  id: number;
  name: string;
  role: UserRole;
};

function AuthDashboard() {
  const [user, setUser] =
    useState<User | null>(null);

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === "admin";

  function loginAsAdmin() {
    setUser({
      id: 1,
      name: "Ayşe",
      role: "admin",
    });
  }

  function loginAsUser() {
    setUser({
      id: 2,
      name: "Mehmet",
      role: "user",
    });
  }

  function logout() {
    setUser(null);
  }

  return (
    <main>
      <h1>Auth UI State</h1>

      {!isAuthenticated ? (
        <section>
          <p>Please login.</p>

          <button onClick={loginAsAdmin}>
            Login as Admin
          </button>

          <button onClick={loginAsUser}>
            Login as User
          </button>
        </section>
      ) : (
        <section>
          <p>Welcome, {user.name}</p>
          <p>Role: {user.role}</p>

          {isAdmin && (
            <button>
              Open Admin Panel
            </button>
          )}

          <button onClick={logout}>
            Logout
          </button>
        </section>
      )}
    </main>
  );
}

export default AuthDashboard;