// =============================================================================
// LESSON 1: EXPORTING TYPES
// =============================================================================
// A module is a file that imports or exports something.
//
// This file is responsible for shared TypeScript types. It does not contain
// runtime data or business logic. Other files can import these types with:
//
// import type { Product, Customer } from "./types.js";
//
// Use `import type` when importing types only. Types help TypeScript check your
// code during development, but they do not exist when the program runs.

// `ProductStatus` is a union type. A product status must be exactly one of
// these string values.
export type ProductStatus = "draft" | "active" | "sold_out";

// `export type` makes this type available to other files.
// Required properties: id, title, price, status
// Optional property: discountPrice
export type Product = {
  id: string;
  title: string;
  price: number;
  status: ProductStatus;
  discountPrice?: number;
};

// Optional properties use `?`.
// `email?: string` means a customer may have an email, but it is not required.
export type Customer = {
  id: string;
  name: string;
  email?: string;
  isPremium: boolean;
};
