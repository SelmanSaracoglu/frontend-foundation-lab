// =============================================================================
// OBJECT TYPES IN TYPESCRIPT
// =============================================================================
// Objects are collections of key-value pairs, allowing you to group related data.
// Unlike arrays, objects use named keys instead of numeric indices.
// Syntax: { key: value, key2: value2 }
// TypeScript allows defining object shapes using type aliases for type safety.

/* Example: object stores related values in named properties.
   title: string
   price: number
   isAvailable: boolean
*/

const basicProduct = {
  title: "Cream Tunic",
  price: 49.99,
  isAvailable: true,
};

// Accessing object properties using dot notation:
console.log("Basic Product title:", basicProduct.title);
console.log("Basic Product price:", basicProduct.price);
console.log("Is basic product available?", basicProduct.isAvailable);

// -----------------------------------------------------------------------------
// DEFINING OBJECT TYPES
// -----------------------------------------------------------------------------
// Use a type alias to define what properties an object must include.

// Inline object types work, but type aliases are easier to reuse.
// const inlineProduct: { title: string; price: number; isAvailable: boolean } = { ... };

type Product = {
  title: string;
  price: number;
  isAvailable: boolean;
};

const product2: Product = {
  title: "Black Dress",
  price: 79.99,
  isAvailable: false,
};

// -----------------------------------------------------------------------------
// TYPE SAFETY EXAMPLES
// -----------------------------------------------------------------------------
// TypeScript enforces type safety - all required properties must be present:
// Uncomment the line below to see the error:
// const incompleteProduct: Product = {
//   title: "Cream Tunic",
//   price: 49.99,
//   // Missing 'isAvailable' property - TypeScript will show an error
// };

// TypeScript also prevents adding extra properties not defined in the type:
// Uncomment the lines below to see the error:
// const extraPropertyProduct: Product = {
//   title: "Cream Tunic",
//   price: 49.99,
//   isAvailable: true,
//   color: "white" // Error: 'color' does not exist in type 'Product'
// };

// =============================================================================
// COMPLEX OBJECT EXAMPLES
// =============================================================================

// Example: a product type with an explicit id property
type ProductFull = {
  id: string;
  title: string;
  price: number;
  isAvailable: boolean;
};

const product: ProductFull = {
  id: "p1",
  title: "Cream Tunic",
  price: 49.99,
  isAvailable: true,
};

console.log("Full Product:", product);
console.log("Product ID:", product.id);
console.log("Product title:", product.title);
console.log("Product price:", product.price);
console.log("Product available:", product.isAvailable);

// -----------------------------------------------------------------------------
// CUSTOMER OBJECT
// -----------------------------------------------------------------------------
type Customer = {
  id: string;
  name: string;
  age: number;
  isPremium: boolean;
};

const customer: Customer = {
  id: "c1",
  name: "Alice",
  age: 28,
  isPremium: false,
};

console.log("Customer:", customer);
console.log("Customer name:", customer.name);
console.log("Customer age:", customer.age);
console.log("Customer premium:", customer.isPremium);

// -----------------------------------------------------------------------------
// ORDER OBJECT
// -----------------------------------------------------------------------------
type Order = {
  id: string;
  total: number;
  isPaid: boolean;
};

const order: Order = {
  id: "ORD-1001",
  total: 129.9,
  isPaid: true,
};

console.log("Order:", order);
console.log("Order ID:", order.id);
console.log("Order total:", order.total);
console.log("Order paid:", order.isPaid);

// -----------------------------------------------------------------------------
// ADDITIONAL EXAMPLES FOR FASHION/E-COMMERCE DOMAIN
// -----------------------------------------------------------------------------

type Boutique = {
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

type Campaign = {
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

type ShippingOption = {
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

// -----------------------------------------------------------------------------
// DEMONSTRATING OBJECT USAGE
// -----------------------------------------------------------------------------
console.log("Boutique:", boutique);
console.log("Campaign:", campaign);
console.log("Shipping Option:", shippingOption);
