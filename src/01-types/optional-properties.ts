// =============================================================================
// OPTIONAL PROPERTIES IN TYPESCRIPT
// =============================================================================
// Optional properties are properties that may or may not be present in an object.
// They are marked with a ? after the property name.
// This allows for flexible object structures.

// -----------------------------------------------------------------------------
// PRODUCT TYPE WITH OPTIONAL PROPERTIES
// -----------------------------------------------------------------------------
type Product = {
  id: string;
  title: string;
  price: number;
  discountPrice?: number; // Optional: may have a discounted price
  description?: string;   // Optional: may have a description
};

// -----------------------------------------------------------------------------
// EXAMPLES OF PRODUCTS
// -----------------------------------------------------------------------------
// Product without optional properties
const normalProduct: Product = {
  id: "p1",
  title: "Cream Tunic",
  price: 49.99,
};

// Product with optional properties
const discountedProduct: Product = {
  id: "p2",
  title: "Black Dress",
  price: 79.99,
  discountPrice: 59.99,
  description: "Elegant dress for special occasions.",
};

// -----------------------------------------------------------------------------
// WORKING WITH OPTIONAL PROPERTIES
// -----------------------------------------------------------------------------
// Functions that handle optional properties safely

function getFinalPrice(product: Product): number {
  // Use nullish coalescing (??) to provide fallback
  return product.discountPrice ?? product.price;
}

function getDiscountText(product: Product): string {
  if (product.discountPrice === undefined) {
    return "No discount";
  }

  return `${product.discountPrice.toFixed(2)} €`;
}

function getDescriptionText(product: Product): string {
  // Use nullish coalescing for optional string
  return product.description ?? "No description";
}

// -----------------------------------------------------------------------------
// DEMONSTRATING OPTIONAL PROPERTIES
// -----------------------------------------------------------------------------
console.log("Normal product:", normalProduct);
console.log("Discounted product:", discountedProduct);

console.log("Normal final price:", getFinalPrice(normalProduct));
console.log("Discounted final price:", getFinalPrice(discountedProduct));

console.log("Normal discount:", getDiscountText(normalProduct));
console.log("Discounted discount:", getDiscountText(discountedProduct));

console.log("Normal description:", getDescriptionText(normalProduct));
console.log("Discounted description:", getDescriptionText(discountedProduct));

// -----------------------------------------------------------------------------
// WHY OPTIONAL PROPERTIES MATTER
// -----------------------------------------------------------------------------
// Optional properties make your types more flexible.
// They allow objects to have different sets of properties.
// Always handle undefined values safely in your code.