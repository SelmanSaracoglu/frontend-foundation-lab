// 11-enums-vs-literal-unions/exercises.ts

// Exercise 1:
// Create a weak User type first.
//
// It should have:
// - readonly id: string
// - email: string
// - role: string
//
// Create one user with an invalid role like "superhero".
// Add a comment explaining why TypeScript accepts it.

// Your code here:



// --------------------------------------------------

// Exercise 2:
// Create a literal union type named UserRole.
//
// It should allow only:
// - "admin"
// - "user"
// - "support"
//
// Create a User type using UserRole.
// Create one valid user.
// Add a commented-out invalid user example.

// Your code here:



// --------------------------------------------------

// Exercise 3:
// Create a string enum named UserRoleEnum.
//
// It should have:
// - Admin = "admin"
// - User = "user"
// - Support = "support"
//
// Create a type named EnumUser with:
// - readonly id: string
// - email: string
// - role: UserRoleEnum
//
// Create one valid EnumUser.

// Your code here:



// --------------------------------------------------

// Exercise 4:
// Create a literal union named OrderStatus.
//
// It should allow:
// - "created"
// - "paid"
// - "shipped"
// - "cancelled"
//
// Create an Order type with:
// - readonly id: string
// - status: OrderStatus
//
// Create one valid Order.

// Your code here:



// --------------------------------------------------

// Exercise 5:
// Create a const array named paymentStatuses.
//
// It should contain:
// - "pending"
// - "paid"
// - "failed"
//
// Use `as const`.
// Then create a type named PaymentStatus from the array.
//
// Create a Payment type with:
// - readonly id: string
// - status: PaymentStatus
//
// Create one valid Payment.

// Your code here:



// --------------------------------------------------

// Exercise 6:
// Create a const array named environments.
//
// It should contain:
// - "development"
// - "test"
// - "production"
//
// Use `as const`.
// Create a type named Environment from the array.
//
// Write a function named getBaseUrl.
// It should accept Environment.
// It should return:
// - "http://localhost:3000" for development
// - "https://test.example.com" for test
// - "https://example.com" for production

// Your code here:



// --------------------------------------------------

// Exercise 7:
// Create a const array named userRoles.
//
// It should contain:
// - "admin"
// - "user"
// - "support"
//
// Use `as const`.
// Create a type named SafeUserRole from the array.
//
// Write a function named isUserRole.
// It should accept a string.
// It should return `value is SafeUserRole`.
//
// Hint:
// return userRoles.includes(value as SafeUserRole);

// Your code here:



// --------------------------------------------------

// Exercise 8:
// Using the previous isUserRole function,
// write a function named parseUserRole.
//
// It should accept a string.
// It should return SafeUserRole | null.
//
// If value is a valid role, return value.
// Otherwise return null.

// Your code here:



// --------------------------------------------------

// Exercise 9:
// Create a literal union named SecurityAction.
//
// It should allow only:
// - "LOGIN_SUCCESS"
// - "LOGIN_FAILED"
// - "PASSWORD_RESET_REQUESTED"
// - "PERMISSION_DENIED"
//
// Create a SecurityLog type with:
// - readonly id: string
// - actorUserId: string
// - action: SecurityAction
// - createdAt: string
//
// Create one valid SecurityLog.
// Add a commented-out invalid SecurityLog example.

// Your code here:



// --------------------------------------------------

// Exercise 10:
// Create a literal union named Permission.
//
// It should allow:
// - "users:read"
// - "users:create"
// - "users:update"
// - "users:delete"
//
// Create a type named RolePermissions with:
// - role: UserRole
// - permissions: Permission[]
//
// Create one valid RolePermissions object.
// Add a commented-out invalid permission example.

// Your code here:



// --------------------------------------------------

// Exercise 11:
// Create a discriminated union named JobState.
//
// It should have:
//
// Queued:
// - status: "queued"
//
// Running:
// - status: "running"
// - startedAt: string
//
// Completed:
// - status: "completed"
// - completedAt: string
//
// Failed:
// - status: "failed"
// - error: string
//
// Write a function named getJobMessage.
// Use switch.
// Add exhaustive checking with never.

// Your code here:



// --------------------------------------------------

// Exercise 12:
// Write a short comment answering:
//
// In new TypeScript code, when would you choose literal union over enum?
//
// Your answer here: