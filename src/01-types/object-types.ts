// Object Types in TypeScript
// Objects are collections of key-value pairs, allowing you to group related data.
// Unlike arrays, objects use named keys instead of numeric indices.
// Syntax: { key: value, key2: value2 }
// TypeScript allows defining object shapes using interfaces or type aliases for type safety.

const product_ = {
  title: "Cream Tunic", // Key-value pair: title is the key, "Cream Tunic" is the value
  price: 49.99,
  isAvailable: true,
};

// We access the values inside the object with a dot notation (property access):
console.log("Product title:", product_.title); // Accessing the 'title' property
console.log("Product price:", product_.price);
console.log("Is product available?", product_.isAvailable);

// How to write object type in TypeScript?
// You can define object types inline, but it's verbose and hard to reuse.
// That's why we generally use type aliases or interfaces for better maintainability.

// Inline type definition (not recommended for reuse):
// type Product = {
//   title: string;
//   price: number;
//   isAvailable: boolean;
// };

// const product2: Product = {
//   title: "Black Dress",
//   price: 79.99,
//   isAvailable: false,
// };

// Defining object type using type alias (recommended approach)

type Products = { // Type alias for an object with specific properties
  title: string;
  price: number;
  isAvailable: boolean;
};

const products: Products = { // Using the type alias to type the object
  title: "Cream Tunic",
  price: 49.99,
  isAvailable: true,
};

// TypeScript also prevents adding extra properties not defined in the type:
// Object literal may only specify known properties, and 'color' does not exist in type 'Product'
// const product___: Product = {
//   title: "Cream Tunic",
//   price: 49.99,
//   isAvailable: true,
//   color: "white" // Error: 'color' is not defined in the type
// };

// ================================================================== //

// Defining more complex object types with multiple properties
type Product = { // Type for a product with id, title, price, and availability
  id: string;
  title: string;
  price: number;
  isAvailable: boolean;
};

const product: Product = { // Creating an object that matches the Product type
  id: "p1",
  title: "Cream Tunic",
  price: 49.99,
  isAvailable: true,
};

console.log("Product:", product); // Logs the entire object
console.log("Product title:", product.title); // Accessing individual properties
console.log("Product price:", product.price);
console.log("Product available:", product.isAvailable);

// Defining a Customer type for user data
type Customer = {
  id: string;
  name: string;
  age: number;
  isPremium: boolean;
};

const customer: Customer = { // Object conforming to Customer type
  id: "c1",
  name: "Alice",
  age: 28,
  isPremium: false,
};

console.log("Customer:", customer);
console.log("Customer name:", customer.name);
console.log("Customer age:", customer.age);
console.log("Customer premium:", customer.isPremium);

// Defining an Order type for transaction data
type Order = {
  id: string;
  total: number;
  isPaid: boolean;
};

const order: Order = { // Order object with payment details
  id: "ORD-1001",
  total: 129.9,
  isPaid: true,
};

console.log("Order:", order);
console.log("Order id:", order.id);
console.log("Order total:", order.total);
console.log("Order paid:", order.isPaid);

// More examples of object types for a fashion/e-commerce domain

type Boutique = { // Type for boutique/store information
    id: string;
    name: string;
    followerCount: number;
    hasOnlineStore: boolean;
};

const boutique: Boutique = {
    id: "b1",
    name: "Fashion World",
    followerCount: 5000,
    hasOnlineStore: true,
};

type Campaign = { // Type for promotional campaigns
    id: string;
    title: string;
    discountRate: number; // e.g., 0.3 means 30% off
    isActive: boolean;
};

const campaign: Campaign = {
    id: "c1",
    title: "Summer Sale",
    discountRate: 0.3,
    isActive: true,
};

type ShippingOption = { // Type for shipping configurations
    id: string;
    country: string;
    price: number;
    isExpress: boolean;
};

const shippingOption: ShippingOption = {
    id: "s1",
    country: "Turkey",
    price: 19.99,
    isExpress: true,
};

// Logging various objects to demonstrate object usage
console.log("Boutique:", boutique);
console.log("Campaign:", campaign);
console.log("Shipping Option:", shippingOption);
