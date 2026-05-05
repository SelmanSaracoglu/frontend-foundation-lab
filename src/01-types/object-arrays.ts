// =============================================================================
// OBJECT ARRAYS IN TYPESCRIPT
// =============================================================================
// This file shows how to use arrays of typed objects in TypeScript.
// Each array contains objects that share the same structure defined by a type.

// -----------------------------------------------------------------------------
// PRODUCT ARRAY
// -----------------------------------------------------------------------------
type Product = {
  id: string;
  title: string;
  price: number;
  isAvailable: boolean;
};

const products: Product[] = [
  {
    id: "p1",
    title: "Cream Tunic",
    price: 49.99,
    isAvailable: true,
  },
  {
    id: "p2",
    title: "Black Dress",
    price: 79.99,
    isAvailable: false,
  },
  {
    id: "p3",
    title: "Cotton Scarf",
    price: 19.99,
    isAvailable: true,
  },
];

console.log("Products:", products); // Log the complete array of products
console.log("First product:", products[0]); // Access the first item in the array
console.log("First product title:", products[0].title); // Access a property of the first object
console.log("Second product price:", products[1].price); // Access a property of the second object
console.log("Third product available:", products[2].isAvailable); // Access a property of the third object

// -----------------------------------------------------------------------------
// CUSTOMER ARRAY
// -----------------------------------------------------------------------------
type Customer = {
  id: string;
  name: string;
  age: number;
  isPremium: boolean;
};

const customers: Customer[] = [
  {
    id: "c1",
    name: "Alice",
    age: 28,
    isPremium: false,
  },
  {
    id: "c2",
    name: "Betty",
    age: 34,
    isPremium: true,
  },
];

console.log("Customers:", customers); // Log the full customer array
console.log("First customer name:", customers[0].name); // Access the first customer's name
console.log("Second customer premium:", customers[1].isPremium); // Access the second customer's premium status

// -----------------------------------------------------------------------------
// ORDER ARRAY
// -----------------------------------------------------------------------------
type Order = {
  id: string;
  total: number;
  isPaid: boolean;
};

const orders: Order[] = [
  {
    id: "ORD-1001",
    total: 129.9,
    isPaid: true,
  },
  {
    id: "ORD-1002",
    total: 89.9,
    isPaid: false,
  },
];

console.log("Orders:", orders); // Log the complete order array
console.log("First order total:", orders[0].total); // Access the total of the first order
console.log("Second order paid:", orders[1].isPaid); // Access the payment status of the second order

