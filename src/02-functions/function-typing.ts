// =============================================================================
// FUNCTION TYPING IN TYPESCRIPT
// =============================================================================
// This file demonstrates how to define function parameter and return types.
// It also shows how to work with object types, optional properties, and safe function behavior.

// -----------------------------------------------------------------------------
// BASIC FUNCTIONS
// -----------------------------------------------------------------------------
// A function with no parameters and no return value.
function sayHello(): void {
  console.log("Hello");
}

sayHello();

// A function with parameters and a return type.
function greetCustomer(name: string): string {
  return `Hello ${name}`;
}

const message = greetCustomer("Alice");
console.log(message);

// A function that returns a number.
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

const total = calculateTotal(49.99, 2);
console.log(total);

// A function that returns a boolean.
function isExpensive(price: number): boolean {
  return price > 100;
}

console.log(isExpensive(129.9)); // true

// A function with return type void.
function logProductTitle(title: string): void {
  console.log(title);
}

logProductTitle("Cream Tunic");

// -----------------------------------------------------------------------------
// OBJECT TYPE EXAMPLES
// -----------------------------------------------------------------------------
// Define a product type with optional properties.
type Product = {
  id: string;
  title: string;
  price: number;
  discountPrice?: number; // Optional property
  stockCount: number;
};

const product: Product = {
  id: "p1",
  title: "Cream Tunic",
  price: 49.99,
  stockCount: 12,
};

const discountedProduct: Product = {
  id: "p2",
  title: "Black Dress",
  price: 79.99,
  discountPrice: 59.99,
  stockCount: 0,
};

// -----------------------------------------------------------------------------
// FUNCTION EXAMPLES WITH OBJECTS
// -----------------------------------------------------------------------------

function getProductTitle(product: Product): string {
  return product.title;
}

function getDiscountText(product: Product): string {
  if (product.discountPrice === undefined) {
    return "No discount";
  }

  return `${product.discountPrice} €`;
}

function getFinalPrice(product: Product): number {
  return product.discountPrice ?? product.price;
}

function formatPrice(price: number): string {
  return `${price} €`;
}

function isInStock(product: Product): boolean {
  return product.stockCount > 0;
}

function getProductSummary(product: Product): string {
  return `${product.title} - ${formatPrice(getFinalPrice(product))}`;
}

function logProduct(product: Product): void {
  console.log("Product id:", product.id);
  console.log("Product title:", product.title);
  console.log("Product price:", product.price);
  console.log("Product in stock:", isInStock(product));
}

// -----------------------------------------------------------------------------
// DEMONSTRATION
// -----------------------------------------------------------------------------
console.log("Product title:", getProductTitle(product));
console.log("Discount text:", getDiscountText(product));
console.log("Discounted product text:", getDiscountText(discountedProduct));

console.log("Final price:", getFinalPrice(product));
console.log("Discounted final price:", getFinalPrice(discountedProduct));

console.log("Product summary:", getProductSummary(product));
console.log("Discounted product summary:", getProductSummary(discountedProduct));

logProduct(product);
logProduct(discountedProduct);

// -----------------------------------------------------------------------------
// NOTES
// -----------------------------------------------------------------------------
// 1. `?:` marks optional properties in a type.
// 2. `function name(params): returnType` defines function types.
// 3. Use `??` or conditional checks to handle optional values safely.


// 1. Customer functions

type Customer = {
  id: string;
  name: string;
  email?: string;
  isPremium: boolean;
};

const premiumCustomer: Customer = {
  id: "c1",
  name: "Ayşe",
  email: "ayse@example.com",
  isPremium: true,
};

const normalCustomer: Customer = {
  id: "c2",
  name: "Fatma",
  isPremium: false,
};

function getCustomerLabel(customer: Customer): string {
  if (customer.isPremium) {
    return `Premium Customer: ${customer.name}`;
  } else {
    return `Customer: ${customer.name}`;
  } 
}

console.log(getCustomerLabel(premiumCustomer));


function getCustomerEmailText(customer: Customer): string {
  if (customer.email === undefined) {
    return "No email provided";
  } else {
    return `Email: ${customer.email}`;
  }
}

console.log(getCustomerEmailText(premiumCustomer));
console.log(getCustomerEmailText(normalCustomer));

// 2. Order functions

type OrderStatus = "new" | "paid" | "shipped" | "cancelled";

type Order = {
  id: string;
  total: number;
  status: OrderStatus;
};

const paidOrder: Order = {
  id: "ORD-1001",
  total: 129.9,
  status: "paid",
};

const cancelledOrder: Order = {
  id: "ORD-1002",
  total: 89.9,
  status: "cancelled",
};

function getOrderStatusText(order: Order): string {
  if (order.status === "new") {
    return "Order is new";
  } else if (order.status === "paid") {
    return "Order is paid";
  } else if (order.status === "shipped") {
    return "Order is shipped";
  } else if (order.status === "cancelled") {
    return "Order is cancelled";
  } else {
    return "Unknown order status";
  } 
}

console.log(getOrderStatusText(paidOrder));
console.log(getOrderStatusText(cancelledOrder));

function canShipOrder(order: Order): boolean {
  return order.status === "paid";
}
console.log("Can ship paid order?", canShipOrder(paidOrder)); // true
console.log("Can ship cancelled order?", canShipOrder(cancelledOrder)); // false

// 3. Cart functions

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

const cartItems: CartItem[] = [
  {
    id: "item1",
    title: "Krem Tunik",
    price: 49.99,
    quantity: 2,
  },
  {
    id: "item2",
    title: "Pamuk Şal",
    price: 19.99,
    quantity: 1,
  },
];

function calculateItemTotal(item: CartItem): number {
  return item.price * item.quantity;
}
function calculateCartTotal(items: CartItem[]): number {
  let total = 0;
  for (const item of items) {
    total += calculateItemTotal(item);
  }
  return total;
}

console.log("Cart total:", calculateCartTotal(cartItems)); // 119.97
