import { useState } from "react";

type User = {
  id: number;
  name: string;
  active: boolean;
};

const users: User[] = [
  {
    id: 1,
    name: "Ayşe",
    active: true,
  },
  {
    id: 2,
    name: "Mehmet",
    active: false,
  },
  {
    id: 3,
    name: "Zeynep",
    active: true,
  },
];

function UserDashboard() {
  const [searchQuery, setSearchQuery] =
    useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(
          searchQuery.toLowerCase()
        )
  );

  const activeUserCount =
    filteredUsers.filter(
      (user) => user.active
    ).length;

  return (
    <main>
      <h1>User Dashboard</h1>

      <input
        value={searchQuery}
        onChange={(event) =>
          setSearchQuery(
            event.target.value
          )
        }
        placeholder="Search users..."
      />

      <p>
        Active Users:
        {activeUserCount}
      </p>

      {filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <section>
          {filteredUsers.map((user) => (
            <div key={user.id}>
              <p>{user.name}</p>

              <p>
                Status:
                {user.active
                  ? " Active"
                  : " Disabled"}
              </p>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

export default UserDashboard;