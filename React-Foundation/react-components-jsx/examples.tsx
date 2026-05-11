function Header() {
  return <h1>Education Dashboard</h1>;
}

function Footer() {
  return <footer>2026 Education Platform</footer>;
}

function UserCard() {
  const userName = "Ayşe";
  const role = "SDET";

  return (
    <div className="user-card">
      <h2>{userName}</h2>
      <p>Role: {role}</p>
    </div>
  );
}

function App() {
  return (
    <main>
      <Header />

      <section>
        <UserCard />
      </section>

      <Footer />
    </main>
  );
}

export default App;
