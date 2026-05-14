function ProfileCard() {
  return (
    <div>
      <h2>Name: Mehmet</h2>
      <p>Role: Platform Engineer</p>
    </div>
  );
}

function Navbar() {
  return (
    <nav>
      <ul>
        <li>Dashboard</li>
        <li>Courses</li>
        <li>Security Logs</li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <main>
      <Navbar />
      <ProfileCard />
    </main>
  );
}

export default App;
