import { useState } from "react";

type FeedbackItem = {
  id: number;
  author: string;
  message: string;
};

type FeedbackFormProps = {
  onAddFeedback: (
    feedback: FeedbackItem
  ) => void;
};

function FeedbackForm({
  onAddFeedback,
}: FeedbackFormProps) {
  const [author, setAuthor] =
    useState("");
  const [message, setMessage] =
    useState("");

  function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    if (!author || !message) {
      return;
    }

    onAddFeedback({
      id: Date.now(),
      author,
      message,
    });

    setAuthor("");
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={author}
        onChange={(event) =>
          setAuthor(event.target.value)
        }
        placeholder="Author"
      />

      <input
        value={message}
        onChange={(event) =>
          setMessage(event.target.value)
        }
        placeholder="Feedback"
      />

      <button type="submit">
        Add Feedback
      </button>
    </form>
  );
}

type SearchInputProps = {
  searchQuery: string;
  onSearchChange: (
    searchQuery: string
  ) => void;
};

function SearchInput({
  searchQuery,
  onSearchChange,
}: SearchInputProps) {
  return (
    <section>
      <input
        value={searchQuery}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        placeholder="Search feedback..."
      />

      <p>Current Search: {searchQuery}</p>
    </section>
  );
}

type FeedbackListProps = {
  feedbackItems: FeedbackItem[];
};

function FeedbackList({
  feedbackItems,
}: FeedbackListProps) {
  if (feedbackItems.length === 0) {
    return <p>No feedback found.</p>;
  }

  return (
    <section>
      {feedbackItems.map((item) => (
        <article key={item.id}>
          <h2>{item.author}</h2>
          <p>{item.message}</p>
        </article>
      ))}
    </section>
  );
}

function App() {
  const [
    feedbackItems,
    setFeedbackItems,
  ] = useState<FeedbackItem[]>([
    {
      id: 1,
      author: "Ayse",
      message: "React props are clear.",
    },
    {
      id: 2,
      author: "Mehmet",
      message: "State lifting needs practice.",
    },
  ]);

  const [searchQuery, setSearchQuery] =
    useState("");

  const filteredFeedback =
    feedbackItems.filter((item) =>
      item.message
        .toLowerCase()
        .includes(
          searchQuery.toLowerCase()
        )
    );

  function addFeedback(
    feedback: FeedbackItem
  ) {
    setFeedbackItems((currentItems) => [
      feedback,
      ...currentItems,
    ]);
  }

  return (
    <main>
      <h1>Searchable Feedback Board</h1>

      <FeedbackForm
        onAddFeedback={addFeedback}
      />

      <SearchInput
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <FeedbackList
        feedbackItems={filteredFeedback}
      />
    </main>
  );
}

export default App;
