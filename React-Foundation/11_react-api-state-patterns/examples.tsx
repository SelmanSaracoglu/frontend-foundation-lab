import {
  useEffect,
  useState,
} from "react";

type ApiStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

type AuditLog = {
  id: number;
  action: string;
  actor: string;
};

function AuditLogList() {
  const [logs, setLogs] =
    useState<AuditLog[]>([]);

  const [status, setStatus] =
    useState<ApiStatus>("idle");

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    async function fetchLogs() {
      try {
        setStatus("loading");
        setErrorMessage("");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw new Error(
            "Failed request"
          );
        }

        const data: Array<{
          id: number;
          title: string;
          userId: number;
        }> = await response.json();

        const mappedLogs: AuditLog[] =
          data.slice(0, 5).map((post) => ({
            id: post.id,
            action: post.title,
            actor: `user-${post.userId}`,
          }));

        setLogs(mappedLogs);
        setStatus("success");
      } catch {
        setStatus("error");
        setErrorMessage(
          "Could not load audit logs. Please try again."
        );
      }
    }

    fetchLogs();
  }, []);

  if (status === "idle") {
    return <p>Preparing audit logs...</p>;
  }

  if (status === "loading") {
    return <p>Loading audit logs...</p>;
  }

  if (status === "error") {
    return <p>{errorMessage}</p>;
  }

  if (logs.length === 0) {
    return <p>No audit logs found.</p>;
  }

  return (
    <section>
      <h2>Audit Logs</h2>

      {logs.map((log) => (
        <article key={log.id}>
          <h3>{log.action}</h3>
          <p>Actor: {log.actor}</p>
        </article>
      ))}
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>API State Patterns</h1>
      <AuditLogList />
    </main>
  );
}

export default App;