type Role =
  | "admin"
  | "support"
  | "viewer";

type Permission =
  | "ticket:read"
  | "ticket:close"
  | "audit:read";

type User = {
  id: number;
  name: string;
  role: Role;
};

//
// EXERCISE 1
//
// rolePermissions oluştur.
//
// admin:
// - ticket:read
// - ticket:close
// - audit:read
//
// support:
// - ticket:read
// - ticket:close
//
// viewer:
// - ticket:read
//

const rolePermissions = {
  // burayı doldur
};

//
// EXERCISE 2
//
// hasPermission function'ı oluştur.
//
// Parametreler:
// - role
// - permission
//
// rolePermissions içinden kontrol et.
//

//
// EXERCISE 3
//
// SupportPanel component'i oluştur.
//
// Props:
// - user
//
// Her kullanıcı için:
//
// View Tickets button
//
// göster.
//
// Eğer ticket:close permission varsa:
//
// Close Ticket button
//
// göster.
//
// Eğer audit:read permission varsa:
//
// View Audit Logs button
//
// göster.
//

type SupportPanelProps = {
  // burayı doldur
};

function SupportPanel(
  props: SupportPanelProps
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
// App içinde currentUser oluştur.
//
// role değerini değiştirerek UI farkını gözlemle.
//

function App() {
  return (
    <main>
      {/* burayı doldur */}
    </main>
  );
}

export default App;