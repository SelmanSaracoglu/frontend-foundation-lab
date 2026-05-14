type Course = {
  id: number;
  title: string;
  instructor: string;
  published: boolean;
};

const courses: Course[] = [
  {
    id: 1,
    title: "React Fundamentals",
    instructor: "Ayse",
    published: true,
  },
  {
    id: 2,
    title: "TypeScript Basics",
    instructor: "Mehmet",
    published: true,
  },
  {
    id: 3,
    title: "API Security",
    instructor: "Zeynep",
    published: false,
  },
];

type CourseCardProps = {
  course: Course;
};

function CourseCard({
  course,
}: CourseCardProps) {
  return (
    <article>
      <h2>{course.title}</h2>
      <p>Instructor: {course.instructor}</p>
      <p>
        Status:
        {course.published
          ? " Published"
          : " Draft"}
      </p>
    </article>
  );
}

function CourseDirectory() {
  if (courses.length === 0) {
    return (
      <section>
        <p>No courses found.</p>
      </section>
    );
  }

  return (
    <section>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
        />
      ))}
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>Course Directory</h1>
      <CourseDirectory />
    </main>
  );
}

export default App;
