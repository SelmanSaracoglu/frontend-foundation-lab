import { useState } from "react";

type Role = "admin" | "viewer";

type User = {
  id: number;
  name: string;
  role: Role;
};

//
// EXERCISE 1
//
// user state oluştur.
// Başlangıç değeri null olsun.
//

//
// EXERCISE 2
//
// isAuthenticated değerini user üzerinden derive et.
//

//
// EXERCISE 3
//
// loginAsViewer function'ı oluştur.
// user state'ini şu değerle güncelle:
//
// {
//   id: 1,
//   name: "Zeynep",
//   role: "viewer"
// }
//

//
// EXERCISE 4
//
// loginAsAdmin function'ı oluştur.
// user state'ini şu değerle güncelle:
//
// {
//   id: 2,
//   name: "Ayşe",
//   role: "admin"
// }
//

//
// EXERCISE 5
//
// Eğer kullanıcı giriş yapmadıysa:
// - Please login.
// - Login as Viewer button
// - Login as Admin button
//
// göster.
//

//
// EXERCISE 6
//
// Eğer kullanıcı giriş yaptıysa:
// - Welcome, kullanıcı adı
// - Role
// - Logout button
//
// göster.
//

//
// EXERCISE 7
//
// Sadece admin için:
//
// Manage Users button
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