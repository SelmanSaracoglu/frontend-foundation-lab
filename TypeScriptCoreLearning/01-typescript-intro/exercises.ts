// 01-typescript-intro/exercises.ts

// Exercise 1
// Create three variables with explicit type annotations:
// - courseName: string
// - lessonCount: number
// - isPublished: boolean

// Write your code here:


// --------------------------------------------------

// Exercise 2
// Create a function named calculateFinalPrice.
// It should accept:
// - price: number
// - discount: number
//
// It should return the price after discount.
// Example:
// calculateFinalPrice(100, 20) should return 80.

// Write your code here:


// --------------------------------------------------

// Exercise 3
// Create a function named createUserLabel.
// It should accept:
// - email: string
// - role: string
//
// It should return a string in this format:
// "admin@example.com has role admin"

// Write your code here:


// --------------------------------------------------

// Exercise 4
// Create a function named isPasswordLongEnough.
// It should accept:
// - password: string
//
// It should return true if password length is at least 8.
// Otherwise it should return false.

// Write your code here:


// --------------------------------------------------

// Exercise 5
// Read this function and fix the type annotations if needed.

function canAccessDashboard(isActive, role) {
  return isActive && role === "admin";
}

// Expected behavior:
// canAccessDashboard(true, "admin") -> true
// canAccessDashboard(true, "user") -> false
// canAccessDashboard(false, "admin") -> false