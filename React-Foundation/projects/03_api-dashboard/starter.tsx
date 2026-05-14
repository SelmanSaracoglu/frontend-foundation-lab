import {
  useEffect,
  useState,
} from "react";

type ApiStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

type DashboardItem = {
  id: number;
  title: string;
  owner?: string;
};

function ApiDashboard() {
  return (
    <section>
      {/* create status, data, error, search, fetch, and derived filtered items */}
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>API Dashboard</h1>
      <ApiDashboard />
    </main>
  );
}

export default App;
