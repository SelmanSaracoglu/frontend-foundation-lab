import { useState } from "react";

function LoginForm() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    console.log("Login submitted");

    console.log({
      email,
      password,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login Form</h2>

      <div>
        <label>Email</label>

        <input
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
        />
      </div>

      <div>
        <label>Password</label>

        <input
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
        />
      </div>

      {password.length > 0 &&
        password.length < 8 && (
          <p>
            Password must be at least
            8 characters
          </p>
        )}

      <button type="submit">
        Login
      </button>
    </form>
  );
}

function SearchPanel() {
  const [query, setQuery] =
    useState("");

  return (
    <section>
      <h2>Search Courses</h2>

      <input
        value={query}
        onChange={(event) =>
          setQuery(event.target.value)
        }
        placeholder="Search..."
      />

      <p>Searching for: {query}</p>
    </section>
  );
}

function App() {
  return (
    <main>
      <LoginForm />

      <SearchPanel />
    </main>
  );
}

export default App;