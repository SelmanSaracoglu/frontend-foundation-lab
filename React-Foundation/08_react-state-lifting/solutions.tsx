import { useState } from "react";

type FilterInputProps = {
  filter: string;
  onFilterChange: (filter: string) => void;
};

function FilterInput({
  filter,
  onFilterChange,
}: FilterInputProps) {
  return (
    <section>
      <input
        value={filter}
        onChange={(event) =>
          onFilterChange(event.target.value)
        }
        placeholder="Filter..."
      />
    </section>
  );
}

type FilterPreviewProps = {
  filter: string;
};

function FilterPreview({
  filter,
}: FilterPreviewProps) {
  return (
    <section>
      <p>Current Filter: {filter}</p>
    </section>
  );
}

function App() {
  const [filter, setFilter] =
    useState("");

  return (
    <main>
      <FilterInput
        filter={filter}
        onFilterChange={setFilter}
      />

      <FilterPreview filter={filter} />
    </main>
  );
}

export default App;
