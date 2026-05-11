//
// EXERCISE 1
//
// Bir CourseList component'i oluştur.
//
// courses dizisini map ile render et.
//

const courses = [
  "React Fundamentals",
  "TypeScript Basics",
  "API Security",
];

function CourseList() {
  return (
    <section>
      {/* burayı doldur */}
    </section>
  );
}

//
// EXERCISE 2
//
// Bir UserStatus component'i oluştur.
//
// Eğer isActive true ise:
//
// User Active
//
// değilse:
//
// User Disabled
//
// render et.
//

function UserStatus() {
  const isActive = false;

  return (
    <section>
      {/* burayı doldur */}
    </section>
  );
}

//
// EXERCISE 3
//
// Bir AdminControls component'i oluştur.
//
// Eğer isAdmin true ise:
//
// Delete User button
//
// render edilsin.
//

function AdminControls() {
  const isAdmin = true;

  return (
    <section>
      {/* burayı doldur */}
    </section>
  );
}

//
// EXERCISE 4
//
// App component'i içinde:
//
// - CourseList
// - UserStatus
// - AdminControls
//
// render et.
//

function App() {
  return (
    <main>
      {/* burayı doldur */}
    </main>
  );
}

export default App;