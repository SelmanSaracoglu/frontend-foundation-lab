import { useState } from "react";

function useToggle(
  initialValue = false
) {
  const [isOpen, setIsOpen] =
    useState(initialValue);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return {
    isOpen,
    toggle,
  };
}

function useCounter() {
  const [count, setCount] =
    useState(0);

  function increase() {
    setCount(count + 1);
  }

  function decrease() {
    setCount(count - 1);
  }

  return {
    count,
    increase,
    decrease,
  };
}

function ModalPanel() {
  const { isOpen, toggle } =
    useToggle();

  return (
    <section>
      <h2>Modal State</h2>

      <button onClick={toggle}>
        Toggle Modal
      </button>

      {isOpen && <p>Modal Open</p>}
    </section>
  );
}

function CounterPanel() {
  const {
    count,
    increase,
    decrease,
  } = useCounter();

  return (
    <section>
      <h2>Counter</h2>

      <p>{count}</p>

      <button onClick={increase}>
        Increase
      </button>

      <button onClick={decrease}>
        Decrease
      </button>
    </section>
  );
}

function App() {
  return (
    <main>
      <ModalPanel />

      <CounterPanel />
    </main>
  );
}

export default App;