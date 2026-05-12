import {
  useEffect,
  useState,
} from "react";

function PageLogger() {
  useEffect(() => {
    console.log(
      "Dashboard component mounted"
    );
  }, []);

  return (
    <section>
      <h2>Dashboard</h2>
    </section>
  );
}

function CounterWatcher() {
  const [count, setCount] =
    useState(0);

  useEffect(() => {
    console.log(
      "Count updated:",
      count
    );
  }, [count]);

  return (
    <section>
      <h2>Counter Watcher</h2>

      <p>Count: {count}</p>

      <button
        onClick={() =>
          setCount(count + 1)
        }
      >
        Increase
      </button>
    </section>
  );
}

function SessionTimer() {
  useEffect(() => {
    const timerId = setInterval(() => {
      console.log("Session active");
    }, 3000);

    return () => {
      clearInterval(timerId);

      console.log("Timer cleaned");
    };
  }, []);

  return (
    <section>
      <h2>Session Timer</h2>
    </section>
  );
}

function App() {
  return (
    <main>
      <PageLogger />

      <CounterWatcher />

      <SessionTimer />
    </main>
  );
}

export default App;