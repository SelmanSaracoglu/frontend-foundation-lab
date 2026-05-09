// 02-primitive-types/exercises.ts

// Exercise 1
// Create these variables using type inference where appropriate:
//
// - productName with value "Monitor"
// - productPrice with value 249.99
// - isInStock with value true

// Write your code here:


// --------------------------------------------------

// Exercise 2
// Create a function named formatProductLabel.
// It should accept:
// - name: string
// - price: number
//
// It should return a string in this format:
// "Monitor costs 249.99 EUR"

// Write your code here:


// --------------------------------------------------

// Exercise 3
// Create a variable named selectedProductId.
// At the beginning, no product is selected.
// Later, assign it the value "product-123".
//
// Choose the correct type annotation.

// Write your code here:


// --------------------------------------------------

// Exercise 4
// Create a variable named lastPaymentDate.
// At the beginning, the value is not known yet.
// Later, assign it the value "2026-05-09".
//
// Choose the correct type annotation.

// Write your code here:


// --------------------------------------------------

// Exercise 5
// Create a function named canRetryLogin.
// It should accept:
// - failedAttempts: number
//
// It should return true if failedAttempts is less than 3.
// Otherwise it should return false.

// Write your code here:


// --------------------------------------------------

// Exercise 6
// Fix this function by adding correct type annotations.

function createAuditMessage(action, actorEmail, success) {
  if (success) {
    return `${actorEmail} successfully performed ${action}`;
  }

  return `${actorEmail} failed to perform ${action}`;
}

// Expected behavior:
// createAuditMessage("LOGIN", "admin@example.com", true)
// -> "admin@example.com successfully performed LOGIN"
//
// createAuditMessage("DELETE_USER", "admin@example.com", false)
// -> "admin@example.com failed to perform DELETE_USER"


// --------------------------------------------------

// Exercise 7
// Read this code and improve the type annotation.

let authToken = null;

// Later in the application:
authToken = "token-abc-123";

// Question:
// What type should authToken have?