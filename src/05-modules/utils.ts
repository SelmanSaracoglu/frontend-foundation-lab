// =============================================================================
// LESSON 3: EXPORTING REUSABLE FUNCTIONS
// =============================================================================
// This file contains helper functions.
//
// Helper functions are a good fit for separate modules because they can be used
// by many files. A frontend project often has utility modules for formatting,
// validation, filtering, sorting, and calculations.
//
// The functions below use Product and Customer as parameter types, so this file
// imports those types with `import type`.

import type { Product, Customer } from "./types.js";

// This function exists at runtime, so it is exported with regular `export`.
// `price: number` types the parameter.
// `: string` types the return value.
export function formatPrice(price: number): string {
  return `${price} EUR`;
}

// `getFinalPrice` accepts a full Product object.
// If discountPrice is missing, the original price is returned.
export function getFinalPrice(product: Product): number {
  if (product.discountPrice === undefined) {
    return product.price;
  }

  return product.discountPrice;
}

// Utility functions can call other utility functions from the same file.
// This keeps repeated logic in one place.
export function getProductSummary(product: Product): string {
  const finalPrice = getFinalPrice(product);
  const priceText = formatPrice(finalPrice);

  return `${product.title} - ${priceText}`;
}

// Optional properties must be checked before they are used as guaranteed values.
// `customer.email` can be string or undefined.
export function getCustomerEmailText(customer: Customer): string {
  if (customer.email === undefined) {
    return "No email provided";
  }

  return customer.email;
}
