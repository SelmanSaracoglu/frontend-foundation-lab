// =============================================================================
// LESSON 2: IMPORTING TYPES AND EXPORTING DATA
// =============================================================================
// This file stores sample data.
//
// It imports `Product` and `Customer` from types.ts so TypeScript can check the
// shape of the arrays below. Because these imports are types only, we use
// `import type`.
//
// Notice the `.js` extension in the import path. This project uses Node-style
// ES modules (`module: "nodenext"`), so local TypeScript imports point to the
// JavaScript file that will exist after compilation.

import type { Product, Customer } from "./types.js";

// `export const` makes this array available to other files.
// `Product[]` means every object in the array must match the Product type.
export const products: Product[] = [
  {
    id: "p1",
    title: "Cream Tunic",
    price: 49.99,
    status: "active",
  },
  {
    id: "p2",
    title: "Black Dress",
    price: 79.99,
    status: "active",
    discountPrice: 59.99,
  },
  {
    id: "p3",
    title: "Cotton Shawl",
    price: 19.99,
    status: "sold_out",
  },
];

// This array is checked against the Customer type.
// The second customer has no email, which is valid because email is optional.
export const customers: Customer[] = [
  {
    id: "c1",
    name: "Alice",
    email: "alice@example.com",
    isPremium: true,
  },
  {
    id: "c2",
    name: "Bob",
    isPremium: false,
  },
];
