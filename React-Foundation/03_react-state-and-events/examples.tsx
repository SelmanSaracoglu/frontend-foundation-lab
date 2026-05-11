import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount(count + 1);
  }

  function decreaseCount() {
    setCount(count - 1);
  }

  return (
    <section>
      <h2>Counter</h2>

      <p>Current Count: {count}</p>

      <button onClick={increaseCount}>
        Increase
      </button>

      <button onClick={decreaseCount}>
        Decrease
      </button>
    </section>
  );
}

function SecurityPanel() {
  const [isLocked, setIsLocked] =
    useState(true);

  function toggleLock() {
    setIsLocked(!isLocked);
  }

  return (
    <section>
      <h2>Security Panel</h2>

      <p>
        Status:
        {isLocked ? " Locked" : " Unlocked"}
      </p>

      <button onClick={toggleLock}>
        Toggle Status
      </button>
    </section>
  );
}

function App() {
  return (
    <main>
      <Counter />

      <SecurityPanel />
    </main>
  );
}

export default App;