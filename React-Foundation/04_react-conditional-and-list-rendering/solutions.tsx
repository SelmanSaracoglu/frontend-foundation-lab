const courses = [
  "React Fundamentals",
  "TypeScript Basics",
  "API Security",
];

function CourseList() {
  return (
    <section>
      <h2>Courses</h2>

      <ul>
        {courses.map((course) => (
          <li key={course}>{course}</li>
        ))}
      </ul>
    </section>
  );
}

function UserStatus() {
  const isActive = false;

  return (
    <section>
      <p>
        {isActive
          ? "User Active"
          : "User Disabled"}
      </p>
    </section>
  );
}

function AdminControls() {
  const isAdmin = true;

  return (
    <section>
      {isAdmin && (
        <button>Delete User</button>
      )}
    </section>
  );
}

function App() {
  return (
    <main>
      <CourseList />
      <UserStatus />
      <AdminControls />
    </main>
  );
}

export default App;
