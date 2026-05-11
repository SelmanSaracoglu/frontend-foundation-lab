type UserCardProps = {
  name: string;
  role: string;
  team: string;
};

function UserCard({ name, role, team, }: UserCardProps) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p> Role: {role} </p>
      <p> Team: {team} </p>
    </div>
  );
}

function App() {
  return (
    <main>
      <UserCard
        name="Ayşe"
        role="SDET"
        team="QA Automation"
      />

      <UserCard
        name="Mehmet"
        role="Platform Engineer"
        team="Infrastructure"
      />

      <UserCard
        name="Zeynep"
        role="Application Security Engineer"
        team="Security"
      />
    </main>
  );
}

export default App;