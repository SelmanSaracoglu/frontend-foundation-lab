// 14-generic-constraints/examples.ts

// =======================================================
// Example 1: Problem without constraint
// =======================================================

// This would be an error:
//
// function printId<T>(item: T) {
//   console.log(item.id);
// }
//
// Because T can be anything.


// =======================================================
// Example 2: Basic generic constraint
// =======================================================

function printId<T extends { id: number }>(item: T) {
  console.log(item.id);
}

printId({
  id: 1,
  name: "Ada",
});

printId({
  id: 2,
  title: "Keyboard",
  price: 120,
});

// Expected output:
// 1
// 2


// =======================================================
// Example 3: Missing required property
// =======================================================

// This would be an error:
//
// printId({
//   name: "Ada",
// });
//
// Because id is missing.


// =======================================================
// Example 4: Constraint with name property
// =======================================================

function printName<T extends { name: string }>(item: T) {
  console.log(item.name);
}

printName({
  name: "Elif",
  age: 25,
});

printName({
  name: "Mouse",
  price: 80,
});

// Expected output:
// Elif
// Mouse


// =======================================================
// Example 5: Constraint keeps full type information
// =======================================================

function returnItem<T extends { id: number }>(item: T): T {
  return item;
}

const user = returnItem({
  id: 1,
  name: "Deniz",
  age: 32,
});

console.log(user.name);
console.log(user.age);

// Expected output:
// Deniz
// 32


// =======================================================
// Example 6: Generic constraint with array
// =======================================================

function findById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => {
    return item.id === id;
  });
}

type Product = {
  id: number;
  title: string;
  price: number;
};

const products: Product[] = [
  { id: 1, title: "Keyboard", price: 120 },
  { id: 2, title: "Mouse", price: 80 },
];

const foundProduct = findById(products, 2);

console.log(foundProduct);

// Expected output:
// { id: 2, title: 'Mouse', price: 80 }


// =======================================================
// Example 7: Handling undefined result
// =======================================================

const missingProduct = findById(products, 99);

if (missingProduct === undefined) {
  console.log("Product not found");
}

// Expected output:
// Product not found