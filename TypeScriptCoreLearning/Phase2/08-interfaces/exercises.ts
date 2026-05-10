// 08-interfaces/exercises.ts

// Exercise 1:
// Create an interface named Task.
// It should have:
// - readonly id: string
// - title: string
// - isCompleted: boolean
//
// Then create one valid Task object.

// Your code here:



// --------------------------------------------------

// Exercise 2:
// Create an interface named CreateTaskRequest.
// It should have:
// - title: string
// - description?: string
//
// Then write a function named createTask.
// It should accept a CreateTaskRequest.
// It should return a Task.

// Your code here:



// --------------------------------------------------

// Exercise 3:
// Create an interface named ApiResponse.
// It should have:
// - success: boolean
// - message: string
//
// Then write a function named completeTask.
// It should accept a Task.
// It should return an ApiResponse.
//
// If task is already completed, return:
// success: false
// message: "Task is already completed"
//
// Otherwise return:
// success: true
// message: "Task completed successfully"

// Your code here:



// --------------------------------------------------

// Exercise 4:
// Create an interface named User.
// It should have:
// - readonly id: string
// - email: string
// - displayName: string
// - isActive: boolean
//
// Create an array named users with at least 3 users.
//
// Then create a new array named activeUsers using filter.

// Your code here:



// --------------------------------------------------

// Exercise 5:
// Create an interface named Address.
// It should have:
// - city: string
// - country: string
//
// Create an interface named Company.
// It should have:
// - readonly id: string
// - name: string
// - address: Address
//
// Then create one valid Company object.

// Your code here:



// --------------------------------------------------

// Exercise 6:
// Create an interface named AuditFields.
// It should have:
// - createdAt: string
// - updatedAt: string
//
// Create an interface named Order.
// It should have:
// - readonly id: string
// - customerEmail: string
// - totalAmount: number
//
// Create an interface named AuditedOrder that extends Order and AuditFields.
//
// Then create one valid AuditedOrder object.

// Your code here:



// --------------------------------------------------

// Exercise 7:
// Create an interface named LoginRequest.
// It should have:
// - email: string
// - password: string
//
// Create an interface named LoginResponse.
// It should have:
// - success: boolean
// - message: string
//
// Write a function named login.
// It should accept a LoginRequest.
// It should return a LoginResponse.
//
// For now, do not validate real credentials.
// Just return:
// success: true
// message: "Login request received"

// Your code here:



// --------------------------------------------------

// Exercise 8:
// Create an interface named BaseUser.
// It should have:
// - readonly id: string
// - email: string
// - displayName: string
//
// Create an interface named AdminUser that extends BaseUser.
// It should add:
// - permissions: string[]
//
// Then create one valid AdminUser object.

// Your code here:



// --------------------------------------------------

// Exercise 9:
// Refactor this inline type into a reusable interface:

/*
function printCourse(course: {
  id: string;
  title: string;
  isPublished: boolean;
}): void {
  console.log(course.title);
}
*/

// Create a Course interface.
// Then rewrite printCourse using Course.

// Your code here:



// --------------------------------------------------

// Exercise 10:
// Create an interface named SecurityLog.
// It should have:
// - readonly id: string
// - actorUserId: string
// - action: string
// - createdAt: string
// - metadata?: Record<string, string>
//
// Then create two SecurityLog objects:
// - one without metadata
// - one with metadata
//
// This connects interfaces to future security logging topics.

// Your code here: