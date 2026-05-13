import {
  useEffect,
  useState,
} from "react";

type ApiStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

type SecurityAlert = {
  id: number;
  message: string;
};

//
// EXERCISE 1
//
// alerts state oluştur.
// Başlangıç değeri boş array olsun.
//

//
// EXERCISE 2
//
// status state oluştur.
// Başlangıç değeri "idle" olsun.
//

//
// EXERCISE 3
//
// errorMessage state oluştur.
// Başlangıç değeri boş string olsun.
//

//
// EXERCISE 4
//
// useEffect içinde fetchAlerts function'ı oluştur.
//
// URL:
// https://jsonplaceholder.typicode.com/comments
//
// response.ok kontrolü yap.
//
// Gelen data içinden ilk 5 kaydı al.
// Her kaydı SecurityAlert tipine map et:
//
// {
//   id: comment.id,
//   message: comment.name
// }
//

//
// EXERCISE 5
//
// UI akışı:
//
// status idle ise:
// Preparing alerts...
//
// status loading ise:
// Loading alerts...
//
// status error ise:
// errorMessage
//
// status success ama liste boşsa:
// No alerts found.
//
// success ve veri varsa:
// alerts listesini render et.
//

function SecurityAlertList() {
  return (
    <section>
      {/* burayı doldur */}
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>Security Alerts</h1>
      <SecurityAlertList />
    </main>
  );
}

export default App;