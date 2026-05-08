// 10-any-unknown/examples.ts

// =======================================================
// Example 1: any disables type checking
// =======================================================

let anyValue: any = "hello";

console.log(anyValue.toUpperCase());

// Expected output:
// HELLO


// =======================================================
// Example 2: any can hide bugs
// =======================================================

let riskyValue: any = 42;

// TypeScript allows this,
// but it would crash at runtime:
//
// console.log(riskyValue.toUpperCase());

console.log(riskyValue);

// Expected output:
// 42


// =======================================================
// Example 3: unknown requires checking
// =======================================================

let unknownValue: unknown = "hello";

// This would be an error:
// console.log(unknownValue.toUpperCase());

if (typeof unknownValue === "string") {
  console.log(unknownValue.toUpperCase());
}

// Expected output:
// HELLO


// =======================================================
// Example 4: unknown with number check
// =======================================================

let input: unknown = 30;

if (typeof input === "number") {
  console.log(input + 10);
}

// Expected output:
// 40


// =======================================================
// Example 5: unknown in a function
// =======================================================

function printUnknownValue(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }

  if (typeof value === "number") {
    console.log(value + 100);
  }
}

printUnknownValue("typescript");
printUnknownValue(50);

// Expected output:
// TYPESCRIPT
// 150


// =======================================================
// Example 6: any vs unknown in functions
// =======================================================

function printAny(value: any) {
  // TypeScript allows this even if value is not a string.
  // This can be dangerous.
  console.log(value.toUpperCase());
}

function printUnknown(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}

// Safe call:
printUnknown("safe");

// Risky call:
// printAny(123);

// Expected output:
// SAFE


// =======================================================
// Example 7: unknown with object check
// =======================================================

function printUserName(value: unknown) {
  if (
    typeof value === "object" &&
    value !== null &&
    "name" in value
  ) {
    console.log(value.name);
  }
}

printUserName({
  name: "Ada",
});

// Expected output:
// Ada