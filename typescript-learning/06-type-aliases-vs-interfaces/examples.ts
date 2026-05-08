// 07-type-aliases-vs-interfaces/examples.ts

// =======================================================
// Example 1: Type alias with object shape
// =======================================================

type User = {
  name: string;
  age: number;
};

const user: User = {
  name: "Ada",
  age: 28,
};

console.log(user.name);
console.log(user.age);

// Expected output:
// Ada
// 28


// =======================================================
// Example 2: Interface with object shape
// =======================================================

interface Product {
  title: string;
  price: number;
}

const product: Product = {
  title: "Keyboard",
  price: 120,
};

console.log(product.title);
console.log(product.price);

// Expected output:
// Keyboard
// 120


// =======================================================
// Example 3: Type alias with union type
// =======================================================

type Status = "success" | "error" | "loading";

const currentStatus: Status = "success";

console.log(currentStatus);

// Expected output:
// success


// =======================================================
// Example 4: Type alias as function parameter
// =======================================================

type Book = {
  title: string;
  pages: number;
};

function printBook(book: Book) {
  console.log(book.title);
  console.log(book.pages);
}

printBook({
  title: "Clean Code",
  pages: 464,
});

// Expected output:
// Clean Code
// 464


// =======================================================
// Example 5: Interface as function parameter
// =======================================================

interface Movie {
  title: string;
  rating: number;
}

function printMovie(movie: Movie) {
  console.log(movie.title);
  console.log(movie.rating);
}

printMovie({
  title: "Inception",
  rating: 9,
});

// Expected output:
// Inception
// 9


// =======================================================
// Example 6: Type alias with array of objects
// =======================================================

type Student = {
  name: string;
  grade: number;
};

const students: Student[] = [
  { name: "Elif", grade: 90 },
  { name: "Mert", grade: 75 },
];

students.forEach((student) => {
  console.log(student.name);
});

// Expected output:
// Elif
// Mert


// =======================================================
// Example 7: Interface with array of objects
// =======================================================

interface Course {
  title: string;
  duration: number;
}

const courses: Course[] = [
  { title: "TypeScript", duration: 10 },
  { title: "React", duration: 15 },
];

courses.forEach((course) => {
  console.log(course.title);
});

// Expected output:
// TypeScript
// React


// =======================================================
// Example 8: Interface extends another interface
// =======================================================

interface BasicUser {
  name: string;
}

interface AdminUser extends BasicUser {
  role: string;
}

const admin: AdminUser = {
  name: "Zeynep",
  role: "admin",
};

console.log(admin.name);
console.log(admin.role);

// Expected output:
// Zeynep
// admin


// =======================================================
// Example 9: Type alias with intersection
// =======================================================

type BasicProduct = {
  title: string;
};

type PricedProduct = BasicProduct & {
  price: number;
};

const pricedProduct: PricedProduct = {
  title: "Mouse",
  price: 80,
};

console.log(pricedProduct.title);
console.log(pricedProduct.price);

// Expected output:
// Mouse
// 80