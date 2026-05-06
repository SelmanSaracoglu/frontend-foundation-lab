// =============================================================================
// LESSON 4: IMPORTING VALUES AND RUNNING THE PROGRAM
// =============================================================================
// This is the entry file for the module example.
//
// The other files each have one responsibility:
//
// types.ts -> exports TypeScript types
// data.ts  -> exports sample arrays
// utils.ts -> exports helper functions
//
// This file imports the runtime values it needs and uses them together.

// These are value imports. They exist when the program runs.
import { products, customers } from "./data.js";
import {
  formatPrice,
  getFinalPrice,
  getProductSummary,
  getCustomerEmailText,
} from "./utils.js";

// The complete dependency flow looks like this:
//
// main.ts -> data.ts  -> types.ts
// main.ts -> utils.ts -> types.ts
//
// A common module habit is to keep shared types low in the dependency chain and
// have app files import data/functions from focused modules.

console.log("=== Products and Customers ===\n");
console.log("Products:", products);
console.log("Customers:", customers);

console.log("\n=== Product Examples ===\n");

const firstProduct = products[0];

// This project enables `noUncheckedIndexedAccess`.
// Because of that, TypeScript treats `products[0]` as Product | undefined.
// Checking for undefined makes the code safe even if the array is empty.
if (firstProduct === undefined) {
  console.log("First product not found");
} else {
  console.log("First product summary:", getProductSummary(firstProduct));
  console.log("Final price:", formatPrice(getFinalPrice(firstProduct)));
}

console.log("\n=== Customer Examples ===\n");

const firstCustomer = customers[0];

// The same array safety rule applies here.
if (firstCustomer === undefined) {
  console.log("First customer not found");
} else {
  console.log("Customer name:", firstCustomer.name);
  console.log("Customer email:", getCustomerEmailText(firstCustomer));
  if (firstCustomer.isPremium === true) {
    console.log("Status: Premium Member");
  } else {
    console.log("Status: Regular Member");
  }
}
