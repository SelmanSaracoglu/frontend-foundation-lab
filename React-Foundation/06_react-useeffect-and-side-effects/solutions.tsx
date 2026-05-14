import {
  useEffect,
  useState,
} from "react";

function AuditLogger() {
  useEffect(() => {
    console.log("Audit page mounted");
  }, []);

  return (
    <section>
      <h2>Audit Logger</h2>
    </section>
  );
}

function LoginTracker() {
  const [loginCount, setLoginCount] =
    useState(0);

  useEffect(() => {
    console.log("Login count changed");
  }, [loginCount]);

  return (
    <section>
      <p>Login Count: {loginCount}</p>

      <button
        onClick={() =>
          setLoginCount(
            (currentCount) =>
              currentCount + 1
          )
        }
      >
        Login
      </button>
    </section>
  );
}

function NotificationTimer() {
  useEffect(() => {
    const timerId = window.setInterval(
      () => {
        console.log(
          "Checking notifications"
        );
      },
      5000
    );

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  return (
    <section>
      <h2>Notification Timer</h2>
    </section>
  );
}

function App() {
  return (
    <main>
      <AuditLogger />
      <LoginTracker />
      <NotificationTimer />
    </main>
  );
}

export default App;
