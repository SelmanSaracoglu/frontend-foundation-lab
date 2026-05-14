type Course = {
  id: number;
  title: string;
  instructor?: string;
};

type CourseDetailsProps = {
  course: Course | null;
};

function CourseDetails({
  course,
}: CourseDetailsProps) {
  if (!course) {
    return (
      <section>
        <p>No course selected.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>{course.title}</h2>
      <p>
        Instructor:
        {course.instructor ?? " Not assigned"}
      </p>
    </section>
  );
}

type SecurityMessageProps = {
  message: string | null;
};

function SecurityMessage({
  message,
}: SecurityMessageProps) {
  return (
    <section>
      <p>
        {message ?? "No security message."}
      </p>
    </section>
  );
}

function App() {
  const course: Course | null = {
    id: 1,
    title: "React Fundamentals",
  };

  return (
    <main>
      <CourseDetails course={course} />
      <SecurityMessage message={null} />
    </main>
  );
}

export default App;
