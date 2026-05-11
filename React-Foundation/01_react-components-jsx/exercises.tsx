//
// EXERCISE 1
//
// Bir ProfileCard component'i oluştur.
//
// Şunları render etsin:
//
// Name: Mehmet
// Role: Platform Engineer
//

function ProfileCard() {
  return (
    <div>
      <h2>Name: Mehmet</h2>
      <p>Role: Platform Engineer</p>
    </div>
  );
}

//
// EXERCISE 2
//
// Bir Navbar component'i oluştur.
//
// İçinde:
//
// Dashboard
// Courses
// Security Logs
//
// yazsın.
//

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

//
// EXERCISE 3
//
// App component'i oluştur.
//
// İçinde:
//
// Navbar
// ProfileCard
//
// render edilsin.
//

function App() {
  return (
    <main>
      <Navbar />
      <ProfileCard />
    </main>
  );
}

export default App;
