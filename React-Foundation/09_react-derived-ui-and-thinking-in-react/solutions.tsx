import { useState } from "react";

type Course = {
  id: number;
  title: string;
  published: boolean;
};

const courses: Course[] = [
  {
    id: 1,
    title: "React Fundamentals",
    published: true,
  },
  {
    id: 2,
    title: "Advanced TypeScript",
    published: false,
  },
  {
    id: 3,
    title: "API Security",
    published: true,
  },
];

function App() {
  const [searchQuery, setSearchQuery] =
    useState("");

  const filteredCourses = courses.filter(
    (course) =>
      course.title
        .toLowerCase()
        .includes(
          searchQuery.toLowerCase()
        )
  );

  const publishedCourseCount =
    filteredCourses.filter(
      (course) => course.published
    ).length;

  return (
    <main>
      <input
        value={searchQuery}
        onChange={(event) =>
          setSearchQuery(event.target.value)
        }
        placeholder="Search courses..."
      />

      <p>
        Published Courses:
        {publishedCourseCount}
      </p>

      {filteredCourses.length === 0 ? (
        <p>No courses found</p>
      ) : (
        <section>
          {filteredCourses.map((course) => (
            <article key={course.id}>
              <h2>{course.title}</h2>
              <p>
                Status:
                {course.published
                  ? " Published"
                  : " Draft"}
              </p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default App;
