import {
  useEffect,
  useState,
} from "react";

type Course = {
  id: number;
  title: string;
};

function CourseList() {
  const [courses, setCourses] =
    useState<Course[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    async function fetchCourses() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch courses"
          );
        }

        const data: Array<{
          id: number;
          title: string;
        }> = await response.json();

        const mappedCourses: Course[] =
          data.slice(0, 5).map((post) => ({
            id: post.id,
            title: post.title,
          }));

        setCourses(mappedCourses);
      } catch {
        setErrorMessage(
          "Could not load courses"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (isLoading) {
    return <p>Loading courses...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <section>
      {courses.map((course) => (
        <article key={course.id}>
          <h2>{course.title}</h2>
        </article>
      ))}
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>Course API</h1>
      <CourseList />
    </main>
  );
}

export default App;
