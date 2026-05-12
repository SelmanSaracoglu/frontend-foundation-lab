import { useState } from "react";

type SearchInputProps = {
  query: string;

  onQueryChange: (
    value: string
  ) => void;
};

function SearchInput({
  query,
  onQueryChange,
}: SearchInputProps) {
  return (
    <section>
      <h2>Search Courses</h2>

      <input
        value={query}
        onChange={(event) =>
          onQueryChange(
            event.target.value
          )
        }
        placeholder="Search..."
      />
    </section>
  );
}

type SearchResultsProps = {
  query: string;
};

function SearchResults({
  query,
}: SearchResultsProps) {
  return (
    <section>
      <h2>Results</h2>

      <p>
        Searching for: {query}
      </p>
    </section>
  );
}

function SearchPage() {
  const [query, setQuery] =
    useState("");

  return (
    <main>
      <SearchInput
        query={query}
        onQueryChange={setQuery}
      />

      <SearchResults query={query} />
    </main>
  );
}

export default SearchPage;