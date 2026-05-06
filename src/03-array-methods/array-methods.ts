// =============================================================================
// ARRAY METHODS IN TYPESCRIPT
// =============================================================================
// This file demonstrates the most common array methods: map, filter, and find.
// It includes both traditional and arrow function syntax with educational comments.

// -----------------------------------------------------------------------------
// BASIC MAP EXAMPLES
// -----------------------------------------------------------------------------
// map creates a new array by transforming each item.
const prices: number[] = [10, 20, 30, 40];

// Traditional function syntax
function doublePrice(price: number): number {
  return price * 2;
}

// Arrow function with explicit return
const doublePriceArrow = (price: number): number => {
  return price * 2;
};

// Arrow function concise body (no return keyword needed)
const doublePriceShort = (price: number): number => price * 2;

console.log("doublePrice:", doublePrice(10));
console.log("doublePriceArrow:", doublePriceArrow(10));
console.log("doublePriceShort:", doublePriceShort(10));

const doubledPrices: number[] = prices.map((price): number => price * 2);
console.log("Doubled prices:", doubledPrices);

// -----------------------------------------------------------------------------
// MAP WITH OBJECTS
// -----------------------------------------------------------------------------
// map can also transform an array of objects into another array.
type Product = {
  id: string;
  title: string;
  price: number;
  isAvailable: boolean;
};

const products: Product[] = [
  { id: "p1", title: "Cream Tunic", price: 49.99, isAvailable: true },
  { id: "p2", title: "Black Dress", price: 79.99, isAvailable: false },
  { id: "p3", title: "Cotton Scarf", price: 19.99, isAvailable: true },
  { id: "p4", title: "Beige Suit", price: 99.99, isAvailable: true },
];

const productTitles: string[] = products.map((product): string => product.title);
console.log("Product titles:", productTitles);

const productPriceTexts: string[] = products.map((product): string => `${product.title} - ${product.price} €`);
console.log("Product price texts:", productPriceTexts);

// -----------------------------------------------------------------------------
// FILTER EXAMPLES
// -----------------------------------------------------------------------------
// filter returns only the items that match a condition.
const availableProducts: Product[] = products.filter((product): boolean => product.isAvailable);
console.log("Available products:", availableProducts);

const expensiveProducts: Product[] = products.filter((product): boolean => product.price > 50);
console.log("Expensive products:", expensiveProducts);

const expensivePrices: number[] = prices.filter((price): boolean => price > 20);
console.log("Prices above 20:", expensivePrices);

const noPricesAbove100: number[] = prices.filter((price): boolean => price > 100);
console.log("Prices above 100:", noPricesAbove100);

// -----------------------------------------------------------------------------
// FIND EXAMPLES
// -----------------------------------------------------------------------------
// find returns the first item that matches the condition, or undefined if none.
const selectedProduct: Product | undefined = products.find((product): boolean => product.id === "p2");

if (selectedProduct === undefined) {
  console.log("Selected product not found");
} else {
  console.log("Selected product:", selectedProduct.title);
}

const missingProduct: Product | undefined = products.find((product): boolean => product.id === "p999");

if (missingProduct === undefined) {
  console.log("Missing product not found");
} else {
  console.log("Missing product:", missingProduct.title);
}

// -----------------------------------------------------------------------------
// MINI CASE: ORDERS
// -----------------------------------------------------------------------------
// This section shows the same methods on an order array.
type OrderStatus = "new" | "paid" | "shipped" | "cancelled";

type Order = {
  id: string;
  total: number;
  status: OrderStatus;
};

const orders: Order[] = [
  { id: "ORD-1001", total: 129.9, status: "paid" },
  { id: "ORD-1002", total: 89.9, status: "cancelled" },
  { id: "ORD-1003", total: 199.9, status: "shipped" },
  { id: "ORD-1004", total: 49.9, status: "new" },
];

const orderIds: string[] = orders.map((order): string => order.id);
console.log("Order IDs:", orderIds);

const paidOrders: Order[] = orders.filter((order): boolean => order.status === "paid");
console.log("Paid orders:", paidOrders);

const selectedOrder: Order | undefined = orders.find((order): boolean => order.id === "ORD-1003");

if (selectedOrder === undefined) {
  console.log("Selected order not found");
} else {
  console.log("Selected order:", selectedOrder);
}

// -----------------------------------------------------------------------------
// MINI CASE: CUSTOMERS
// -----------------------------------------------------------------------------
// This section shows map, filter, and find with a customer array.
type Customer = {
  id: string;
  name: string;
  isPremium: boolean;
};

const customers: Customer[] = [
  { id: "c1", name: "Alice", isPremium: true },
  { id: "c2", name: "Betty", isPremium: false },
  { id: "c3", name: "Carol", isPremium: true },
];

const customerNames: string[] = customers.map((customer): string => customer.name);
console.log("Customer names:", customerNames);

const premiumCustomers: Customer[] = customers.filter((customer): boolean => customer.isPremium);
console.log("Premium customers:", premiumCustomers);

const selectedCustomer: Customer | undefined = customers.find((customer): boolean => customer.id === "c2");

if (selectedCustomer === undefined) {
  console.log("Selected customer not found");
} else {
  console.log("Selected customer:", selectedCustomer);
}

// -----------------------------------------------------------------------------
// HELPER FUNCTIONS USING ARRAY METHODS
// -----------------------------------------------------------------------------
function getAvailableProducts(products: Product[]): Product[] {
  return products.filter((product): boolean => product.isAvailable);
}

function getProductTitles(products: Product[]): string[] {
  return products.map((product): string => product.title);
}

function findProductById(products: Product[], productId: string): Product | undefined {
  return products.find((product): boolean => product.id === productId);
}

console.log("Available via function:", getAvailableProducts(products));
console.log("Product titles via function:", getProductTitles(products));
console.log("Find product by id:", findProductById(products, "p3"));

// -----------------------------------------------------------------------------
// NOTES
// -----------------------------------------------------------------------------
// 1. map returns a new array with transformed values.
// 2. filter returns a new array containing only items that pass the test.
// 3. find returns the first matching item or undefined.
// 4. Use explicit return when the arrow body is a block.
// 5. Use concise arrow syntax when the function body is a single expression.
// 6. Handle undefined values from find before using the result.

console.log("Titles via function:", getProductTitles(products));

const foundProduct = findProductById(products, "p3");

if (foundProduct === undefined) {
  console.log("Product not found via function");
} else {
  console.log("Found via function:", foundProduct.title);
}