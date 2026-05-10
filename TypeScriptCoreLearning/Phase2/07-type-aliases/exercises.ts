// 07-type-aliases/exercises.ts

// Exercise 1:
// Create a type alias named Task.
// It should have:
// - readonly id: string
// - title: string
// - isCompleted: boolean

// Then create one valid Task object.

// Your code here:



// --------------------------------------------------

// Exercise 2:
// Create a type alias named CreateTaskRequest.
// It should have:
// - title: string
// - description?: string

// Then write a function named createTask.
// It should accept a CreateTaskRequest.
// It should return a Task.

// Hint:
// You can create an id manually as a string.
// Example: "task-1"

// Your code here:



// --------------------------------------------------

// Exercise 3:
// Create a type alias named ApiResponse.
// It should have:
// - success: boolean
// - message: string

// Then write a function named completeTask.
// It should accept a Task.
// It should return an ApiResponse.

// If the task is already completed, return:
// success: false
// message: "Task is already completed"

// Otherwise return:
// success: true
// message: "Task completed successfully"

// Your code here:



// --------------------------------------------------

// Exercise 4:
// Create a type alias named User.
// It should have:
// - readonly id: string
// - email: string
// - displayName: string
// - isActive: boolean

// Create an array named users with at least 3 users.

// Then create a new array named activeUsers using filter.

// Your code here:



// --------------------------------------------------

// Exercise 5:
// Create a type alias named Address.
// It should have:
// - city: string
// - country: string

// Create a type alias named Company.
// It should have:
// - readonly id: string
// - name: string
// - address: Address

// Then create one valid Company object.

// Your code here:



// --------------------------------------------------

// Exercise 6:
// Create a type alias named AuditFields.
// It should have:
// - createdAt: string
// - updatedAt: string

// Create a type alias named Order.
// It should have:
// - readonly id: string
// - customerEmail: string
// - totalAmount: number

// Combine Order with AuditFields into a new type alias named AuditedOrder.

// Then create one valid AuditedOrder object.

// Your code here:



// --------------------------------------------------

// Exercise 7:
// Create a type alias named LoginRequest.
// It should have:
// - email: string
// - password: string

// Write a function named login.
// It should accept a LoginRequest.
// It should return an ApiResponse.

// For now, do not validate the real password.
// Just return:
// success: true
// message: "Login request received"

// Your code here:



// --------------------------------------------------

// Exercise 8:
// Create these primitive aliases:
// - type Email = string
// - type Password = string

// Create one Email variable and one Password variable.

// Then try assigning the Password variable to a new Email variable.
// Observe that TypeScript allows it.

// Add a comment explaining why this is allowed.

// Your code here:



// --------------------------------------------------

// Exercise 9:
// Refactor this inline type into a reusable type alias:

/*
function printCourse(course: {
  id: string;
  title: string;
  isPublished: boolean;
}): void {
  console.log(course.title);
}
*/

// Create a Course type alias.
// Then rewrite printCourse using Course.

// Your code here:



// --------------------------------------------------

// Exercise 10:
// Create a type alias named SecurityLog.
// It should have:
// - readonly id: string
// - actorUserId: string
// - action: string
// - createdAt: string
// - metadata?: Record<string, string>

// Then create two SecurityLog objects:
// - one without metadata
// - one with metadata

// This connects type aliases to future security logging topics.

// Your code here: