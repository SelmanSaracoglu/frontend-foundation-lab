// 13-generics-basics/examples.ts

// =======================================================
// Example 1: Repeated functions without generics
// =======================================================

function returnString(value: string): string {
  return value;
}

function returnNumber(value: number): number {
  return value;
}

console.log(returnString("hello"));
console.log(returnNumber(100));

// Expected output:
// hello
// 100


// =======================================================
// Example 2: any works but loses type safety
// =======================================================

function returnAny(value: any): any {
  return value;
}

const anyResult = returnAny("typescript");

console.log(anyResult);

// Expected output:
// typescript


// =======================================================
// Example 3: Basic generic function
// =======================================================

function returnValue<T>(value: T): T {
  return value;
}

const text = returnValue("hello");
const score = returnValue(100);
const isActive = returnValue(true);

console.log(text);
console.log(score);
console.log(isActive);

// Expected output:
// hello
// 100
// true


// =======================================================
// Example 4: Generic array function
// =======================================================

function getFirstItem<T>(items: T[]): T {
  return items[0];
}

const firstNumber = getFirstItem([10, 20, 30]);
const firstName = getFirstItem(["Ada", "Elif", "Mert"]);

console.log(firstNumber);
console.log(firstName);

// Expected output:
// 10
// Ada


// =======================================================
// Example 5: Generic with object array
// =======================================================

type User = {
  name: string;
  age: number;
};

const users: User[] = [
  { name: "Ada", age: 28 },
  { name: "Elif", age: 25 },
];

const firstUser = getFirstItem(users);

console.log(firstUser.name);
console.log(firstUser.age);

// Expected output:
// Ada
// 28


// =======================================================
// Example 6: Generic type alias
// =======================================================

type ApiResponse<T> = {
  data: T;
  success: boolean;
};

type Product = {
  title: string;
  price: number;
};

const productResponse: ApiResponse<Product> = {
  data: {
    title: "Keyboard",
    price: 120,
  },
  success: true,
};

console.log(productResponse.data.title);
console.log(productResponse.success);

// Expected output:
// Keyboard
// true


// =======================================================
// Example 7: ApiResponse with string data
// =======================================================

const messageResponse: ApiResponse<string> = {
  data: "Operation completed",
  success: true,
};

console.log(messageResponse.data);
console.log(messageResponse.success);

// Expected output:
// Operation completed
// true