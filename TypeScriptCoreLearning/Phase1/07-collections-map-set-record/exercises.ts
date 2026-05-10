// 06-collections-map-set-record/exercises.ts

// Exercise 1
// Create an array named courseTopics with these values:
// - "typescript"
// - "react"
// - "node"
// - "typescript"
//
// Then create a Set from it to remove duplicates.

// Write your code here:


// --------------------------------------------------

// Exercise 2
// Create a Set named allowedRoles.
// It should include:
// - "admin"
// - "manager"
// - "user"
//
// Then check if "admin" exists.
// Then check if "guest" exists.

// Write your code here:


// --------------------------------------------------

// Exercise 3
// Create a Set named sensitivePermissions.
// It should include:
// - "delete:user"
// - "manage:roles"
// - "read:audit-log"
//
// Create a function named isSensitivePermission.
// It should accept permission: string.
// It should return boolean.

// Write your code here:


// --------------------------------------------------

// Exercise 4
// Create a Map named productPricesById.
// Key should be string.
// Value should be number.
//
// Add:
// - "product-1" -> 100
// - "product-2" -> 50
//
// Then get the price of "product-1".
// Check undefined before using it.

// Write your code here:


// --------------------------------------------------

// Exercise 5
// Create a Map named sessionsByToken.
// Key should be string.
// Value should be an object with:
// - userId: string
// - expiresAt: string
//
// Add one session.
// Then try to get it by token.
// Check undefined before accessing userId.

// Write your code here:


// --------------------------------------------------

// Exercise 6
// Create a Record named roleLabels.
// Keys should be exactly:
// - "admin"
// - "manager"
// - "user"
//
// Values should be string labels:
// - "Administrator"
// - "Manager"
// - "User"

// Write your code here:


// --------------------------------------------------

// Exercise 7
// Create a Record named statusMessages.
// Keys should be:
// - "success"
// - "error"
// - "loading"
//
// Values should be strings.
// Example:
// success -> "Operation completed"

// Write your code here:


// --------------------------------------------------

// Exercise 8
// Create a Record named permissionDescriptions.
// Key should be string.
// Value should be an object with:
// - description: string
// - isSensitive: boolean
//
// Add at least two permissions.

// Write your code here:


// --------------------------------------------------

// Exercise 9
// Given this users array, create a Map named usersById.
// Key should be user id.
// Value should be the full user object.

const users: {
  id: string;
  email: string;
  role: string;
}[] = [
  {
    id: "user-1",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "user-2",
    email: "user@example.com",
    role: "user",
  },
];

// Write your code here:


// --------------------------------------------------

// Exercise 10
// Decide which collection fits best:
//
// 1. You need to render a list of products in order.
// Answer:
//
// 2. You need to keep unique permission keys.
// Answer:
//
// 3. You need to find a session by token.
// Answer:
//
// 4. You need fixed labels for roles.
// Answer:
//
// 5. You need to remove duplicate emails.
// Answer: