// 11-type-assertions/examples.ts

// =======================================================
// Example 1: unknown without assertion
// =======================================================

let unknownValue: unknown = "hello";

// This would be an error:
// console.log(unknownValue.toUpperCase());

console.log(unknownValue);

// Expected output:
// hello


// =======================================================
// Example 2: Basic type assertion
// =======================================================

let value: unknown = "typescript";

const text = value as string;

console.log(text.toUpperCase());

// Expected output:
// TYPESCRIPT


// =======================================================
// Example 3: Assertion does not convert value
// =======================================================

let numberValue: unknown = 42;

const assertedText = numberValue as string;

// This would crash at runtime:
// console.log(assertedText.toUpperCase());

console.log(assertedText);

// Expected output:
// 42


// =======================================================
// Example 4: Real conversion
// =======================================================

const score = 42;

const convertedText = String(score);

console.log(convertedText);
console.log(convertedText.toUpperCase());

// Expected output:
// 42
// 42


// =======================================================
// Example 5: Safer narrowing before using value
// =======================================================

let input: unknown = "safe value";

if (typeof input === "string") {
  console.log(input.toUpperCase());
}

// Expected output:
// SAFE VALUE


// =======================================================
// Example 6: Object assertion
// =======================================================

type User = {
  name: string;
  age: number;
};

const data: unknown = {
  name: "Ada",
  age: 28,
};

const user = data as User;

console.log(user.name);
console.log(user.age);

// Expected output:
// Ada
// 28


// =======================================================
// Example 7: Function with assertion
// =======================================================

function printUser(data: unknown) {
  const user = data as User;

  console.log(user.name);
  console.log(user.age);
}

printUser({
  name: "Elif",
  age: 25,
});

// Expected output:
// Elif
// 25