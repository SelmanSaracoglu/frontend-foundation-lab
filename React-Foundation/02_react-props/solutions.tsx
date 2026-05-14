type CourseCardProps = {
  title: string;
  instructor: string;
};

function CourseCard({
  title,
  instructor,
}: CourseCardProps) {
  return (
    <div>
      <h2>Course: {title}</h2>
      <p>Instructor: {instructor}</p>
    </div>
  );
}

type SecurityAlertProps = {
  message: string;
  severity: string;
};

function SecurityAlert({
  message,
  severity,
}: SecurityAlertProps) {
  return (
    <section>
      <h2>Alert: {message}</h2>
      <p>Severity: {severity}</p>
    </section>
  );
}

function App() {
  return (
    <main>
      <CourseCard
        title="React Fundamentals"
        instructor="Ayse"
      />

      <SecurityAlert
        message="Unauthorized login attempt"
        severity="High"
      />

      <SecurityAlert
        message="Suspicious API request"
        severity="Medium"
      />
    </main>
  );
}

export default App;
