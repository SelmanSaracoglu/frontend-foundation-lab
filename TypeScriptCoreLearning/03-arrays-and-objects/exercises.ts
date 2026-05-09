// 03-arrays-and-objects/exercises.ts

// Exercise 1
// Create a string array named courseTopics.
// It should include:
// - "TypeScript"
// - "React"
// - "Node"

// Write your code here:


// --------------------------------------------------

// Exercise 2
// Create a number array named testScores.
// It should include: 85, 90, 100.

// Write your code here:


// --------------------------------------------------

// Exercise 3
// Create an object named product with this shape:
//
// - id: string
// - name: string
// - price: number
// - isAvailable: boolean
//
// Use any realistic values.

// Write your code here:


// --------------------------------------------------

// Exercise 4
// Create an array named products.
// Each product should have:
//
// - id: string
// - name: string
// - price: number
// - isAvailable: boolean
//
// Add at least two products.

// Write your code here:


// --------------------------------------------------

// Exercise 5
// Create a user object with this shape:
//
// - readonly id: string
// - email: string
// - isActive: boolean
// - lastLoginAt?: string
//
// Then try updating email.
// Do not update id.

// Write your code here:


// --------------------------------------------------

// Exercise 6
// Create an object named session with this shape:
//
// - token: string
// - expiresInSeconds: number
// - user:
//   - id: string
//   - email: string
//   - role: string

// Write your code here:


// --------------------------------------------------

// Exercise 7
// Create a function named printUserStatus.
// It should accept a user object with:
//
// - email: string
// - isActive: boolean
//
// If user is active, print:
// "admin@example.com is active"
//
// Otherwise print:
// "admin@example.com is inactive"

// Write your code here:


// --------------------------------------------------

// Exercise 8
// Fix the type annotation for this array.

const auditLogs = [
  {
    id: "log-1",
    action: "LOGIN",
    actorEmail: "admin@example.com",
    success: true,
  },
  {
    id: "log-2",
    action: "DELETE_USER",
    actorEmail: "admin@example.com",
    success: false,
  },
];

// Add an explicit type annotation to auditLogs.
// Each audit log should have:
// - readonly id: string
// - action: string
// - actorEmail: string
// - success: boolean