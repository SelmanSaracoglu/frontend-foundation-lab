import { useState } from "react";

function FeedbackForm() {
  const [feedback, setFeedback] =
    useState("");

  return (
    <section>
      <input
        value={feedback}
        onChange={(event) =>
          setFeedback(event.target.value)
        }
        placeholder="Write feedback..."
      />

      <p>Feedback: {feedback}</p>
    </section>
  );
}

function RegisterForm() {
  const [username, setUsername] =
    useState("");
  const [password, setPassword] =
    useState("");

  function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    console.log({
      username,
      password,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(event) =>
          setUsername(event.target.value)
        }
        placeholder="Username"
      />

      <input
        value={password}
        onChange={(event) =>
          setPassword(event.target.value)
        }
        placeholder="Password"
        type="password"
      />

      {password.length > 0 &&
        password.length < 6 && (
          <p>Password too short</p>
        )}

      <button type="submit">
        Register
      </button>
    </form>
  );
}

function App() {
  return (
    <main>
      <FeedbackForm />
      <RegisterForm />
    </main>
  );
}

export default App;
