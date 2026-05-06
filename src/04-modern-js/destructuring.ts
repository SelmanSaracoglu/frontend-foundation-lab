// =============================================================================
// DESTRUCTURING IN TYPESCRIPT
// =============================================================================
// Destructuring allows you to extract values from objects and arrays
// into separate variables using a concise syntax.

// -----------------------------------------------------------------------------
// OBJECT DESTRUCTURING
// -----------------------------------------------------------------------------
type Product = {
  id: string;
  title: string;
  price: number;
  isAvailable: boolean;
};

const product: Product = {
  id: "p1",
  title: "Cream Tunic",
  price: 49.99,
  isAvailable: true,
};

// Normal property access without destructuring:
const normalTitle = product.title;
const normalPrice = product.price;

console.log("Normal title:", normalTitle);
console.log("Normal price:", normalPrice);

// Object destructuring extracts properties into variables with the same name:
const { title, price } = product;

console.log("Destructured title:", title);
console.log("Destructured price:", price);

// Rename properties while destructuring:
const { title: productTitle, price: productPrice } = product;

console.log("Renamed title:", productTitle);
console.log("Renamed price:", productPrice);

function getProductSummary(product: Product): string {
  const { title, price } = product;
  return `${title} - ${price} €`;
}

console.log("Product summary:", getProductSummary(product));

function getProductAvailabilityText(product: Product): string {
  const { isAvailable } = product;

  if (isAvailable) {
    return "In stock";
  }

  return "Out of stock";
}

console.log("Availability:", getProductAvailabilityText(product));

// -----------------------------------------------------------------------------
// ARRAY DESTRUCTURING
// -----------------------------------------------------------------------------
// Array destructuring assigns elements to variables based on position.
const sizes: string[] = ["S", "M", "L", "XL"];
const [firstSize, secondSize] = sizes;

console.log("First size:", firstSize);
console.log("Second size:", secondSize);

const prices: number[] = [49.99, 79.99, 19.99];
const [firstPrice, secondPrice, thirdPrice] = prices;

console.log("First price:", firstPrice);
console.log("Second price:", secondPrice);
console.log("Third price:", thirdPrice);

// Array destructuring can skip elements using commas:
const [, , thirdSize] = sizes;
console.log("Third size:", thirdSize);

// -----------------------------------------------------------------------------
// SUMMARY NOTES
// -----------------------------------------------------------------------------
// - Use object destructuring when you want to extract multiple properties.
// - Use rename syntax when the variable name should differ from the property name.
// - Use array destructuring to assign elements by their order.
// - Destructuring keeps code shorter and easier to read.


// Mini Cases
// 1. Customer destructuring
type Customer = {
  id: string;
  name: string;
  isPremium: boolean;
};

const customer: Customer = {
  id: "c1",
  name: "Alice",
  isPremium: true,
};

const { name, isPremium } = customer;

function getCustomerLabel(customer: Customer): string {
  const { name, isPremium } = customer;
  if (isPremium === true) {
    return `${name} (Premium)`;
  } else {
    return name;
  }
}

console.log(getCustomerLabel(customer));

// 2. Order destructuring

type OrderStatus = "new" | "paid" | "shipped" | "cancelled";

type Order = {
  id: string;
  total: number;
  status: OrderStatus;
};

const order: Order = {
  id: "ORD-1001",
  total: 129.9,
  status: "paid",
};

const { id, total, status } = order;

function getOrderSummary(order: Order): string {
  const { id, total, status } = order;
  if (status === "paid") {
    return `${id} - ${total} € - Paid`;
  } else {
    return `${id} - ${total} € - ${status}`;
  }
}



console.log("Order summary:", getOrderSummary(order));

// -----------------------------------------------------------------------------


