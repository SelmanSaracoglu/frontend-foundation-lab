import {
  useEffect,
  useState,
} from "react";

type ApiStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

type SecurityAlert = {
  id: number;
  message: string;
};

function SecurityAlertList() {
  const [alerts, setAlerts] =
    useState<SecurityAlert[]>([]);

  const [status, setStatus] =
    useState<ApiStatus>("idle");

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    async function fetchAlerts() {
      try {
        setStatus("loading");
        setErrorMessage("");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch alerts"
          );
        }

        const data: Array<{
          id: number;
          name: string;
        }> = await response.json();

        const mappedAlerts: SecurityAlert[] =
          data.slice(0, 5).map(
            (comment) => ({
              id: comment.id,
              message: comment.name,
            })
          );

        setAlerts(mappedAlerts);
        setStatus("success");
      } catch {
        setStatus("error");
        setErrorMessage(
          "Could not load alerts"
        );
      }
    }

    fetchAlerts();
  }, []);

  if (status === "idle") {
    return <p>Preparing alerts...</p>;
  }

  if (status === "loading") {
    return <p>Loading alerts...</p>;
  }

  if (status === "error") {
    return <p>{errorMessage}</p>;
  }

  if (alerts.length === 0) {
    return <p>No alerts found.</p>;
  }

  return (
    <section>
      {alerts.map((alert) => (
        <article key={alert.id}>
          <h2>{alert.message}</h2>
        </article>
      ))}
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>Security Alerts</h1>
      <SecurityAlertList />
    </main>
  );
}

export default App;
