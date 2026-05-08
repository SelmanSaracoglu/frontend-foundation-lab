// 15-keyof-basics/examples.ts

// =======================================================
// Example 1: Basic keyof
// =======================================================

type User = {
  name: string;
  age: number;
};

type UserKey = keyof User;

const userKey: UserKey = "name";

console.log(userKey);

// Expected output:
// name


// =======================================================
// Example 2: keyof prevents invalid keys
// =======================================================

const anotherUserKey: UserKey = "age";

// This would be an error:
// const wrongUserKey: UserKey = "email";

console.log(anotherUserKey);

// Expected output:
// age


// =======================================================
// Example 3: keyof as function parameter
// =======================================================

function printUserValue(user: User, key: keyof User) {
  console.log(user[key]);
}

const user: User = {
  name: "Ada",
  age: 28,
};

printUserValue(user, "name");
printUserValue(user, "age");

// This would be an error:
// printUserValue(user, "email");

// Expected output:
// Ada
// 28


// =======================================================
// Example 4: keyof with product
// =======================================================

type Product = {
  title: string;
  price: number;
};

function printProductValue(product: Product, key: keyof Product) {
  console.log(product[key]);
}

const product: Product = {
  title: "Keyboard",
  price: 120,
};

printProductValue(product, "title");
printProductValue(product, "price");

// Expected output:
// Keyboard
// 120


// =======================================================
// Example 5: Generic getValue
// =======================================================

function getValue<T, K extends keyof T>(item: T, key: K): T[K] {
  return item[key];
}

const userName = getValue(user, "name");
const userAge = getValue(user, "age");

console.log(userName);
console.log(userAge);

// Expected output:
// Ada
// 28


// =======================================================
// Example 6: Generic getValue with Product
// =======================================================

const productTitle = getValue(product, "title");
const productPrice = getValue(product, "price");

console.log(productTitle);
console.log(productPrice);

// Expected output:
// Keyboard
// 120


// =======================================================
// Example 7: Invalid key with getValue
// =======================================================

// This would be an error:
// getValue(user, "email");
//
// Because "email" is not a key of User.