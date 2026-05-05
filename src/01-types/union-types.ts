// =============================================================================
// UNION TYPES IN TYPESCRIPT
// =============================================================================
// Union types allow a value to be one of several specified types.
// They are useful when a variable or property can only hold a small set of possible values.

// -----------------------------------------------------------------------------
// UNION TYPE DEFINITIONS
// -----------------------------------------------------------------------------
// These type aliases define allowed string values for product and order properties.
type ProductSize = "S" | "M" | "L" | "XL";
type ProductStatus = "draft" | "active" | "sold_out";
type OrderStatus = "new" | "paid" | "shipped" | "cancelled";
type PaymentMethod = "paypal" | "bank_transfer" | "cash";

// -----------------------------------------------------------------------------
// PRODUCT TYPE
// -----------------------------------------------------------------------------
// The Product type uses union types for size and status.
type Product = {
  id: string;
  title: string;
  price: number;
  size: ProductSize;
  status: ProductStatus;
};

const product: Product = {
  id: "p1",
  title: "Cream Tunic",
  price: 49.99,
  size: "M",
  status: "active",
};

console.log("Product:", product);
console.log("Product size:", product.size);
console.log("Product status:", product.status);

// -----------------------------------------------------------------------------
// ORDER TYPE
// -----------------------------------------------------------------------------
// The Order type uses union types for status and payment method.
type Order = {
  id: string;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
};

const order: Order = {
  id: "ORD-1001",
  total: 129.9,
  status: "paid",
  paymentMethod: "bank_transfer",
};

console.log("Order:", order);
console.log("Order status:", order.status);
console.log("Payment method:", order.paymentMethod);

// -----------------------------------------------------------------------------
// WHY UNION TYPES MATTER
// -----------------------------------------------------------------------------
// Using union types here ensures that these values are limited to specific options.
// If you try to assign a value outside the allowed set, TypeScript will raise an error.
// This makes your code safer and easier to maintain.
