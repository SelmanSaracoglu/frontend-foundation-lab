// 05-array-methods/exercises.ts

const products: {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
}[] = [
  {
    id: "product-1",
    name: "Keyboard",
    price: 100,
    isAvailable: true,
    category: "electronics",
  },
  {
    id: "product-2",
    name: "Mouse",
    price: 50,
    isAvailable: true,
    category: "electronics",
  },
  {
    id: "product-3",
    name: "Notebook",
    price: 10,
    isAvailable: false,
    category: "office",
  },
];

// Exercise 1
// Use forEach to print each product name.

// Write your code here:


// --------------------------------------------------

// Exercise 2
// Use map to create an array of product names.
// Expected result:
// ["Keyboard", "Mouse", "Notebook"]

// Write your code here:


// --------------------------------------------------

// Exercise 3
// Use filter to create an array of available products.

// Write your code here:


// --------------------------------------------------

// Exercise 4
// Use find to find the product with id "product-2".
// Check undefined before using the result.

// Write your code here:


// --------------------------------------------------

// Exercise 5
// Use some to check if there is any unavailable product.

// Write your code here:


// --------------------------------------------------

// Exercise 6
// Use every to check if all products are available.

// Write your code here:


// --------------------------------------------------

// Exercise 7
// Use filter and map together to create an array of names
// for only available products.
// Expected result:
// ["Keyboard", "Mouse"]

// Write your code here:


// --------------------------------------------------

// Exercise 8
// Use reduce to calculate total price of all products.
// Expected result:
// 160

// Write your code here:


// --------------------------------------------------

// Exercise 9
// Given this permissions array, use includes to check
// whether the user can delete users.

const permissions = ["read:user", "update:user", "read:audit-log"];

// Write your code here:


// --------------------------------------------------

// Exercise 10
// Given this audit log array, use filter to get only failed logs.
// Then use map to get only the actorEmail values.

const auditLogs: {
  action: string;
  actorEmail: string;
  success: boolean;
}[] = [
  { action: "LOGIN", actorEmail: "admin@example.com", success: true },
  { action: "DELETE_USER", actorEmail: "admin@example.com", success: false },
  { action: "LOGIN", actorEmail: "user@example.com", success: false },
];

// Expected result:
// ["admin@example.com", "user@example.com"]

// Write your code here: