import { useState } from "react";

function useVisibility() {
  const [isVisible, setIsVisible] =
    useState(false);

  function toggleVisibility() {
    setIsVisible(
      (currentValue) => !currentValue
    );
  }

  return {
    isVisible,
    toggleVisibility,
  };
}

function useInput() {
  const [value, setValue] =
    useState("");

  function onChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setValue(event.target.value);
  }

  return {
    value,
    onChange,
  };
}

function VisibilityPanel() {
  const {
    isVisible,
    toggleVisibility,
  } = useVisibility();

  return (
    <section>
      <button onClick={toggleVisibility}>
        Toggle Visibility
      </button>

      {isVisible && <p>Content Visible</p>}
    </section>
  );
}

function SearchPanel() {
  const searchInput = useInput();

  return (
    <section>
      <input
        value={searchInput.value}
        onChange={searchInput.onChange}
        placeholder="Search..."
      />

      <p>
        Current Search: {searchInput.value}
      </p>
    </section>
  );
}

function App() {
  return (
    <main>
      <VisibilityPanel />
      <SearchPanel />
    </main>
  );
}

export default App;
