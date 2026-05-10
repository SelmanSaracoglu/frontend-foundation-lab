// 13-type-guards/examples.ts

// -----------------------------------------------------
// 1. Basit narrowing
// -----------------------------------------------------

function printUnknownValue(value: unknown): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
    return;
  }

  if (typeof value === "number") {
    console.log(value * 2);
    return;
  }

  console.log("Unsupported value");
}

printUnknownValue("typescript");
printUnknownValue(10);
printUnknownValue(false);


// -----------------------------------------------------
// 2. Custom type guard
// -----------------------------------------------------

type User = {
  id: number;
  email: string;
  isActive: boolean;
};

function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "id" in value &&
    typeof value.id === "number" &&
    "email" in value &&
    typeof value.email === "string" &&
    "isActive" in value &&
    typeof value.isActive === "boolean"
  );
}

const rawUser: unknown = JSON.parse(
  '{"id":1,"email":"admin@example.com","isActive":true}'
);

if (isUser(rawUser)) {
  console.log(rawUser.email.toLowerCase());
} else {
  console.log("Invalid user data");
}


// -----------------------------------------------------
// 3. API response gibi düşünelim
// -----------------------------------------------------

type ApiUserResponse = {
  id: number;
  email: string;
  role: "admin" | "user";
};

function isApiUserResponse(value: unknown): value is ApiUserResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "id" in value &&
    typeof value.id === "number" &&
    "email" in value &&
    typeof value.email === "string" &&
    "role" in value &&
    (value.role === "admin" || value.role === "user")
  );
}

const apiData: unknown = {
  id: 2,
  email: "user@example.com",
  role: "user",
};

if (isApiUserResponse(apiData)) {
  console.log(`User ${apiData.email} has role ${apiData.role}`);
}


// -----------------------------------------------------
// 4. Array type guard
// -----------------------------------------------------

type Product = {
  id: number;
  name: string;
  price: number;
};

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "id" in value &&
    typeof value.id === "number" &&
    "name" in value &&
    typeof value.name === "string" &&
    "price" in value &&
    typeof value.price === "number"
  );
}

function isProductArray(value: unknown): value is Product[] {
  return Array.isArray(value) && value.every(isProduct);
}

const rawProducts: unknown = [
  { id: 1, name: "Keyboard", price: 100 },
  { id: 2, name: "Mouse", price: 50 },
];

if (isProductArray(rawProducts)) {
  const total = rawProducts.reduce((sum, product) => sum + product.price, 0);
  console.log(total);
} else {
  console.log("Invalid product list");
}