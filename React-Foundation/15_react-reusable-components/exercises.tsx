//
// EXERCISE 1
//
// Button component'i oluştur.
//
// Props:
// - label: string
// - variant: "primary" | "danger"
//
// Render:
// button içinde label göster.
//

type ButtonProps = {
  // burayı doldur
};

function Button(props: ButtonProps) {
  return (
    <button>
      {/* burayı doldur */}
    </button>
  );
}

//
// EXERCISE 2
//
// EmptyState component'i oluştur.
//
// Props:
// - title: string
// - message?: string
//
// Eğer message varsa göster.
//

type EmptyStateProps = {
  // burayı doldur
};

function EmptyState(
  props: EmptyStateProps
) {
  return (
    <section>
      {/* burayı doldur */}
    </section>
  );
}

//
// EXERCISE 3
//
// Panel component'i oluştur.
//
// Props:
// - children: React.ReactNode
//
// section içinde children render et.
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
// EXERCISE 4
//
// App içinde:
//
// - Panel içinde EmptyState
// - primary Button
// - danger Button
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