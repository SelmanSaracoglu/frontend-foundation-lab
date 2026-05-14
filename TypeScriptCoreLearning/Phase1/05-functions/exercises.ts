// 04-functions/exercises.ts

// Exercise 1
// Create a function named formatCourseTitle.
// It should accept:
// - title: string
//
// It should return:
// "Course: TypeScript Basics"

// Write your code here:


// --------------------------------------------------

// Exercise 2
// Create a function named calculateDiscountedPrice.
// It should accept:
// - price: number
// - discountPercent: number
//
// It should return the discounted price.
// Example:
// calculateDiscountedPrice(100, 20) -> 80

// Write your code here:


// --------------------------------------------------

// Exercise 3
// Create a function named printAuditLog.
// It should accept:
// - action: string
// - actorEmail: string
// - success: boolean
//
// It should not return anything.
// It should print:
// "admin@example.com LOGIN success: true"

// Write your code here:


// --------------------------------------------------

// Exercise 4
// Create a function named createProduct.
// It should accept:
// - name: string
// - price: number
//
// It should return an object with:
// - name: string
// - price: number
// - isAvailable: boolean
//
// isAvailable should be true by default.

// Write your code here:


// --------------------------------------------------

// Exercise 5
// Create a function named canAccessAdminPanel.
// It should accept a user object with:
// - role: string
// - isActive: boolean
//
// It should return true only if:
// - role is "admin"
// - isActive is true

// Write your code here:


// --------------------------------------------------

// Exercise 6
// Create a function named createSearchUrl.
// It should accept:
// - query: string
// - page?: number
//
// If page is not provided, use page 1.
// Example:
// createSearchUrl("typescript") -> "/search?q=typescript&page=1"
// createSearchUrl("typescript", 3) -> "/search?q=typescript&page=3"

// Write your code here:


// --------------------------------------------------

// Exercise 7
// Create a function named transformEmail.
// It should accept:
// - email: string
// - transformer: function that accepts string and returns string
//
// It should return the transformed email.
//
// Example transformer:
// email => email.trim().toLowerCase()

// Write your code here:


// --------------------------------------------------

// Exercise 8
// Create a function named hasRequiredPermission.
// It should accept:
// - userPermissions: string[]
// - requiredPermission: string
//
// It should return true if requiredPermission exists in userPermissions.

// Write your code here:


// --------------------------------------------------

// Exercise 9
// Fix this function by adding proper parameter and return types.

function countFailedLogs(
  logs: {
    action: string;
    actorEmail: string;
    success: boolean;
  }[],
): number {
  let count = 0;

  for (const log of logs) {
    if (log.success === false) {
      count = count + 1;
    }
  }

  return count;
}

// Expected input shape:
// logs is an array of objects.
// Each log has:
// - action: string
// - actorEmail: string
// - success: boolean
//
// Expected behavior:
// countFailedLogs([
//   { action: "LOGIN", actorEmail: "a@example.com", success: true },
//   { action: "DELETE_USER", actorEmail: "a@example.com", success: false }
// ])
// -> 1
