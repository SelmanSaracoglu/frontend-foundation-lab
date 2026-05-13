type Course = {
  id: number;
  title: string;
  instructor?: string;
};

//
// EXERCISE 1
//
// CourseDetails component'i oluştur.
//
// Props:
// - course: Course | null
//
// Eğer course null ise:
//
// No course selected.
//
// render et.
//
// Değilse title göster.
//

type CourseDetailsProps = {
  // burayı doldur
};

function CourseDetails(
  props: CourseDetailsProps
) {
  return (
    <section>
      {/* burayı doldur */}
    </section>
  );
}

//
// EXERCISE 2
//
// instructor optional olduğu için,
// instructor yoksa:
//
// Instructor: Not assigned
//
// göster.
//

//
// EXERCISE 3
//
// SecurityMessage component'i oluştur.
//
// Props:
// - message: string | null
//
// Eğer message null ise:
//
// No security message.
//
// göster.
//

type SecurityMessageProps = {
  // burayı doldur
};

function SecurityMessage(
  props: SecurityMessageProps
) {
  return (
    <section>
      {/* burayı doldur */}
    </section>
  );
}

//
// EXERCISE 4
//
// App içinde:
//
// - CourseDetails
// - SecurityMessage
//
// render et.
//

function App() {
  const course: Course | null = {
    id: 1,
    title: "React Fundamentals",
  };

  return (
    <main>
      {/* burayı doldur */}
    </main>
  );
}

export default App;