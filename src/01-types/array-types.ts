// Array Types in TypeScript
// Arrays are collections of values of the same type, stored in a single variable.
// Syntax: type[] or Array<type>
// Arrays are zero-indexed, meaning the first element is at index 0.

const productTitles: string[] = ["Cream Tunic", "Black Dress", "Cotton Scarf"]; // Array of strings for product names
const productPrices: number[] = [49.99, 79.99, 19.99]; // Array of numbers for prices
const availabilityList: boolean[] = [true, false, true]; // Array of booleans for availability

console.log("Product titles:", productTitles);
console.log("Product prices:", productPrices);
console.log("Availability list:", availabilityList);

const customerNames: string[] = ["Alice", "Betty", "Carol"]; // Array of customer names
const customerAges: number[] = [28, 34, 41]; // Array of ages
const premiumStatuses: boolean[] = [false, true, false]; // Array of premium statuses

console.log("Customer names:", customerNames);
console.log("Customer ages:", customerAges);
console.log("Premium statuses:", premiumStatuses);

// Note: TypeScript enforces type safety. Uncommenting the lines below would cause type errors:
// const wrongProductTitles: string[] = ["Tunic", "Scarf", 123]; // Error: number not assignable to string
// const wrongPrices: number[] = [49.99, "79.99", 19.99]; // Error: string not assignable to number
// const wrongAvailability: boolean[] = [true, false, "yes"]; // Error: string not assignable to boolean

const categoryNames: string[] = ["Clothing", "Shoes", "Accessories"]; // Categories as strings
const categoryProductsCounts: number[] = [1, 2, 3]; // Counts as numbers
const categoryIsActive: boolean[] = [true, true, false]; // Active status as booleans

console.log("Category names:", categoryNames);
console.log("Category products counts:", categoryProductsCounts);
console.log("Category active statuses:", categoryIsActive);

// Accessing array elements by index (starting from 0)
console.log("First category names:", categoryNames[0]); // Index 0: "Clothing"
console.log("Second category products count:", categoryProductsCounts[1]); // Index 1: 2
console.log("Third category active status:", categoryIsActive[2]); // Index 2: false

