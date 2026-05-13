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

//
// EXERCISE 1
//
// searchQuery state oluştur.
//

//
// EXERCISE 2
//
// searchQuery kullanarak:
//
// filteredCourses
//
// derived value oluştur.
//

//
// EXERCISE 3
//
// published course sayısını derive et.
//

//
// EXERCISE 4
//
// Input oluştur.
//
// Kullanıcı yazdıkça searchQuery güncellensin.
//

//
// EXERCISE 5
//
// Eğer sonuç yoksa:
//
// No courses found
//
// render et.
//

//
// EXERCISE 6
//
// filteredCourses listesini render et.
//

function App() {
  return (
    <main>
      {/* burayı doldur */}
    </main>
  );
}

export default App;