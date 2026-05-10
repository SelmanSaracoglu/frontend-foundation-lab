// 01-typescript-intro/examples.ts

// Example 1: Basic type annotations

const userEmail: string = "admin@example.com";
const loginAttempts: number = 3;
const isAccountLocked: boolean = false;

console.log(userEmail);
console.log(loginAttempts);
console.log(isAccountLocked);

// Expected output:
// admin@example.com
// 3
// false

// --------------------------------------------------

// Example 2: TypeScript catches incorrect values

function calculateOrderTotal(price: number, quantity: number): number {
  return price * quantity;
}

const total = calculateOrderTotal(25, 4);

console.log(total);

// Expected output:
// 100

// This would be a TypeScript error:
// calculateOrderTotal("25", 4);

// Why?
// Because price must be a number, not a string.

// --------------------------------------------------

// Example 3: Type inference

const productName = "Keyboard";
const productPrice = 89.99;
const isAvailable = true;

// TypeScript infers:
// productName -> string
// productPrice -> number
// isAvailable -> boolean

console.log(productName);
console.log(productPrice);
console.log(isAvailable);

// Expected output:
// Keyboard
// 89.99
// true

// --------------------------------------------------

// Example 4: Function return type

function createWelcomeMessage(name: string): string {
  return `Welcome, ${name}`;
}

const message = createWelcomeMessage("Ada");

console.log(message);

// Expected output:
// Welcome, Ada

// --------------------------------------------------

// Example 5: Why types help in real project logic

function canLogin(isActive: boolean, failedAttempts: number): boolean {
  return isActive && failedAttempts < 5;
}

console.log(canLogin(true, 2));
console.log(canLogin(true, 6));
console.log(canLogin(false, 1));

// Expected output:
// true
// false
// false

// This would be a TypeScript error:
// canLogin("yes", 2);

// Why?
// Because isActive must be boolean.