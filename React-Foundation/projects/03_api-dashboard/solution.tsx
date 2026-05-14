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
  const [items, setItems] =
    useState<DashboardItem[]>([]);
  const [status, setStatus] =
    useState<ApiStatus>("idle");
  const [errorMessage, setErrorMessage] =
    useState("");
  const [searchQuery, setSearchQuery] =
    useState("");

  useEffect(() => {
    async function fetchItems() {
      try {
        setStatus("loading");
        setErrorMessage("");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch dashboard items"
          );
        }

        const data: Array<{
          id: number;
          title: string;
          userId: number;
        }> = await response.json();

        const mappedItems: DashboardItem[] =
          data.slice(0, 8).map((post) => ({
            id: post.id,
            title: post.title,
            ...(post.userId % 2 === 0
              ? {
                  owner: `user-${post.userId}`,
                }
              : {}),
          }));

        setItems(mappedItems);
        setStatus("success");
      } catch {
        setStatus("error");
        setErrorMessage(
          "Could not load dashboard items."
        );
      }
    }

    fetchItems();
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.title
        .toLowerCase()
        .includes(
          searchQuery.toLowerCase()
        )
  );

  if (status === "idle") {
    return <p>Preparing dashboard...</p>;
  }

  if (status === "loading") {
    return <p>Loading dashboard...</p>;
  }

  if (status === "error") {
    return <p>{errorMessage}</p>;
  }

  return (
    <section>
      <input
        value={searchQuery}
        onChange={(event) =>
          setSearchQuery(event.target.value)
        }
        placeholder="Search items..."
      />

      {filteredItems.length === 0 ? (
        <p>No dashboard items found.</p>
      ) : (
        <section>
          {filteredItems.map((item) => (
            <article key={item.id}>
              <h2>{item.title}</h2>
              <p>
                Owner:
                {item.owner ?? " Not assigned"}
              </p>
            </article>
          ))}
        </section>
      )}
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
