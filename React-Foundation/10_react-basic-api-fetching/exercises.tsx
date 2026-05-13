import {
  useEffect,
  useState,
} from "react";

type Course = {
  id: number;
  title: string;
};

//
// EXERCISE 1
//
// courses state oluştur.
// Başlangıç değeri boş array olsun.
//

//
// EXERCISE 2
//
// isLoading state oluştur.
// Başlangıç değeri true olsun.
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
// useEffect içinde async fetchCourses function'ı oluştur.
//
// URL:
// https://jsonplaceholder.typicode.com/posts
//
// response.ok kontrolü yap.
//
// Gelen data içinden ilk 5 kaydı al.
// Her kaydı Course tipine map et:
//
// {
//   id: post.id,
//   title: post.title
// }
//

//
// EXERCISE 5
//
// Loading durumunda:
//
// Loading courses...
//
// render et.
//

//
// EXERCISE 6
//
// Error durumunda errorMessage render et.
//

//
// EXERCISE 7
//
// Başarılı durumda courses listesini render et.
//

function CourseList() {
  return (
    <section>
      {/* burayı doldur */}
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