// 02-primitive-types/examples.ts

// Example 1: string

const userEmail = "admin@example.com";
const userName = "Ada";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

console.log(normalizeEmail("  ADMIN@EXAMPLE.COM  "));

// Expected output:
// admin@example.com

// --------------------------------------------------

// Example 2: number

const productPrice = 49.99;
const quantity = 3;

function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

console.log(calculateTotal(productPrice, quantity));

// Expected output:
// 149.97

// --------------------------------------------------

// Example 3: boolean

const isActive = true;
const isAccountLocked = false;

function canLogin(isActive: boolean, isAccountLocked: boolean): boolean {
  return isActive && !isAccountLocked;
}

console.log(canLogin(isActive, isAccountLocked));
console.log(canLogin(true, true));
console.log(canLogin(false, false));

// Expected output:
// true
// false
// false

// --------------------------------------------------

// Example 4: null

let currentSessionToken: string | null = null;

console.log(currentSessionToken);

// Login successful:
currentSessionToken = "token-abc-123";

console.log(currentSessionToken);

// Logout:
currentSessionToken = null;

console.log(currentSessionToken);

// Expected output:
// null
// token-abc-123
// null

// --------------------------------------------------

// Example 5: undefined

let lastLoginAt: string | undefined;

console.log(lastLoginAt);

lastLoginAt = "2026-05-09T10:00:00Z";

console.log(lastLoginAt);

// Expected output:
// undefined
// 2026-05-09T10:00:00Z

// --------------------------------------------------

// Example 6: checking null before using a value

function printSessionToken(token: string | null): void {
  if (token === null) {
    console.log("No active session");
    return;
  }

  console.log(`Active session token: ${token}`);
}

printSessionToken(null);
printSessionToken("token-xyz");

// Expected output:
// No active session
// Active session token: token-xyz

// --------------------------------------------------

// Example 7: checking undefined before using a value

function printLastLogin(lastLoginAt: string | undefined): void {
  if (lastLoginAt === undefined) {
    console.log("User has never logged in");
    return;
  }

  console.log(`Last login: ${lastLoginAt}`);
}

printLastLogin(undefined);
printLastLogin("2026-05-09T10:00:00Z");

// Expected output:
// User has never logged in
// Last login: 2026-05-09T10:00:00Z

// --------------------------------------------------

// Example 8: primitive types are useful but sometimes too broad

function canAccessAdminPanel(role: string, isActive: boolean): boolean {
  return role === "admin" && isActive;
}

console.log(canAccessAdminPanel("admin", true));
console.log(canAccessAdminPanel("user", true));
console.log(canAccessAdminPanel("anything", true));

// Expected output:
// true
// false
// false

// This works, but role: string is very broad.
// Later we will make this safer with literal union types:
// type Role = "admin" | "manager" | "user";