// =======================================================
// Example 1: Normal object access
// =======================================================

const user = {
  name: "Ada",
  age: 28,
};

const userName = user.name;
const userAge = user.age;

console.log(userName);
console.log(userAge);

// Expected output:
// Ada
// 28


// =======================================================
// Example 2: Object destructuring
// =======================================================

const product = {
  title: "Keyboard",
  price: 120,
};

const { title, price } = product;

console.log(title);
console.log(price);

// Expected output:
// Keyboard
// 120


// =======================================================
// Example 3: Destructuring with a typed object
// =======================================================

type User = {
  name: string;
  age: number;
};

const firstUser: User = {
  name: "Elif",
  age: 25,
};

const { name, age } = firstUser;

console.log(name);
console.log(age);

// Expected output:
// Elif
// 25


// =======================================================
// Example 4: Normal function parameter with object type
// =======================================================

function printUserNormal(user: User) {
  console.log(user.name);
  console.log(user.age);
}

const secondUser: User = {
  name: "Deniz",
  age: 32,
};

printUserNormal(secondUser);

// Expected output:
// Deniz
// 32


// =======================================================
// Example 5: Function parameter destructuring
// =======================================================

function printUserDestructured({ name, age }: User) {
  console.log(name);
  console.log(age);
}

const thirdUser: User = {
  name: "Mert",
  age: 21,
};

printUserDestructured(thirdUser);

// Expected output:
// Mert
// 21


// =======================================================
// Example 6: Optional property with destructuring
// =======================================================

type Profile = {
  username: string;
  bio?: string;
};

const profile: Profile = {
  username: "codelearner",
};

const { username, bio } = profile;

console.log(username);
console.log(bio);

// Expected output:
// codelearner
// undefined


// =======================================================
// Example 7: Optional property with type narrowing
// =======================================================

type Student = {
  name: string;
  grade?: number;
};

const student: Student = {
  name: "Zeynep",
  grade: 90,
};

const { grade } = student;

if (grade !== undefined) {
  console.log(grade);
}

// Expected output:
// 90


// =======================================================
// Example 8: Default value with destructuring
// =======================================================

type Account = {
  email: string;
  isActive?: boolean;
};

const account: Account = {
  email: "ada@example.com",
};

const { email, isActive = false } = account;

console.log(email);
console.log(isActive);

// Expected output:
// ada@example.com
// false


// =======================================================
// Example 9: Rename variable while destructuring
// =======================================================

const book = {
  title: "Clean Code",
  pages: 464,
};

const { title: bookTitle } = book;

console.log(bookTitle);

// Expected output:
// Clean Code


// =======================================================
// Example 10: Array destructuring
// =======================================================

const colors = ["red", "green", "blue"];

const [firstColor, secondColor] = colors;

console.log(firstColor);
console.log(secondColor);

// Expected output:
// red
// green


// =======================================================
// Example 11: Array destructuring with numbers
// =======================================================

const scores = [90, 80, 70];

const [firstScore, secondScore] = scores;

console.log(firstScore);
console.log(secondScore);

// Expected output:
// 90
// 80


// =======================================================
// Example 12: Normal map with typed object array
// =======================================================

type Product = {
  title: string;
  price: number;
};

const products: Product[] = [
  { title: "Keyboard", price: 120 },
  { title: "Mouse", price: 80 },
  { title: "Monitor", price: 300 },
];

const productTitlesNormal = products.map((product) => {
  return product.title;
});

console.log(productTitlesNormal);

// Expected output:
// [ 'Keyboard', 'Mouse', 'Monitor' ]


// =======================================================
// Example 13: map with destructuring
// =======================================================

const productTitlesDestructured = products.map(({ title }) => {
  return title;
});

console.log(productTitlesDestructured);

// Expected output:
// [ 'Keyboard', 'Mouse', 'Monitor' ]


// =======================================================
// Example 14: Normal filter with typed object array
// =======================================================

const expensiveProductsNormal = products.filter((product) => {
  return product.price > 100;
});

console.log(expensiveProductsNormal);

// Expected output:
// [
//   { title: 'Keyboard', price: 120 },
//   { title: 'Monitor', price: 300 }
// ]


// =======================================================
// Example 15: filter with destructuring
// =======================================================

const expensiveProductsDestructured = products.filter(({ price }) => {
  return price > 100;
});

console.log(expensiveProductsDestructured);

// Expected output:
// [
//   { title: 'Keyboard', price: 120 },
//   { title: 'Monitor', price: 300 }
// ]