//
// EXERCISE 1
//
// Bir PageTitle component'i oluştur.
//
// Props:
// - title
// - subtitle
//
// Render:
// h1 içinde title
// p içinde subtitle
//

type PageTitleProps = {
  // burayı doldur
};

function PageTitle(props: PageTitleProps) {
  return (
    <header>
      {/* burayı doldur */}
    </header>
  );
}

//
// EXERCISE 2
//
// Bir Panel component'i oluştur.
//
// children prop'u alsın.
// Gelen children içeriğini section içinde render et.
//

type PanelProps = {
  // burayı doldur
};

function Panel(props: PanelProps) {
  return (
    <section>
      {/* burayı doldur */}
    </section>
  );
}

//
// EXERCISE 3
//
// Bir CourseSummary component'i oluştur.
//
// Panel component'ini kullansın.
//
// İçinde:
// - h2: React Fundamentals
// - p: Learn component-based UI development
//

function CourseSummary() {
  return (
    <>
      {/* burayı doldur */}
    </>
  );
}

//
// EXERCISE 4
//
// Bir SecuritySummary component'i oluştur.
//
// Panel component'ini kullansın.
//
// İçinde:
// - h2: Security Overview
// - p: No critical vulnerabilities found
//

function SecuritySummary() {
  return (
    <>
      {/* burayı doldur */}
    </>
  );
}

//
// EXERCISE 5
//
// App component'i içinde:
//
// - PageTitle
// - CourseSummary
// - SecuritySummary
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