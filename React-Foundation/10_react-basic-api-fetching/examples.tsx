import {
  useEffect,
  useState,
} from "react";

type User = {
  id: number;
  name: string;
  role: string;
};

function UserList() {
  const [users, setUsers] =
    useState<User[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch users"
          );
        }

        const data: Array<{
          id: number;
          name: string;
        }> = await response.json();

        const mappedUsers: User[] =
          data.map((user) => ({
            id: user.id,
            name: user.name,
            role: "Learner",
          }));

        setUsers(mappedUsers);
      } catch {
        setErrorMessage(
          "Could not load users"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <section>
      <h2>Users</h2>

      {users.map((user) => (
        <article key={user.id}>
          <h3>{user.name}</h3>
          <p>Role: {user.role}</p>
        </article>
      ))}
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>API Fetching Example</h1>
      <UserList />
    </main>
  );
}

export default App;