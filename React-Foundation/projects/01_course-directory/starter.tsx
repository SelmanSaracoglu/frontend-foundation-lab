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
  // fill here
};

function CourseCard(props: CourseCardProps) {
  return (
    <article>
      {/* fill here */}
    </article>
  );
}

function CourseDirectory() {
  return (
    <section>
      {/* render empty state or course cards */}
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
