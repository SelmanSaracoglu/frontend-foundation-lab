// 10-discriminated-unions/exercises.ts

// Exercise 1:
// Create a discriminated union named ApiResult.
//
// It should have two cases:
//
// Success:
// - status: "success"
// - data: string
//
// Error:
// - status: "error"
// - error: string
//
// Then write a function named printApiResult.
// It should accept ApiResult.
// If success, print data.
// If error, print error.

// Your code here:



// --------------------------------------------------

// Exercise 2:
// Create a discriminated union named LoadingState.
//
// It should have three cases:
//
// Idle:
// - status: "idle"
//
// Loading:
// - status: "loading"
//
// Loaded:
// - status: "loaded"
// - items: string[]
//
// Then write a function named getLoadingMessage.
// It should return:
// - "Idle" for idle
// - "Loading..." for loading
// - "Loaded X items" for loaded

// Your code here:



// --------------------------------------------------

// Exercise 3:
// Create a User type:
// - readonly id: string
// - email: string
//
// Create a discriminated union named AuthState.
//
// It should have four cases:
//
// Checking:
// - status: "checking"
//
// Authenticated:
// - status: "authenticated"
// - user: User
//
// Anonymous:
// - status: "anonymous"
//
// Error:
// - status: "error"
// - error: string
//
// Then write a function named getAuthLabel.
// It should accept AuthState and return a string.

// Your code here:



// --------------------------------------------------

// Exercise 4:
// Create a discriminated union named PaymentState.
//
// It should have:
//
// Pending:
// - status: "pending"
//
// Paid:
// - status: "paid"
// - paidAt: string
//
// Failed:
// - status: "failed"
// - reason: string
//
// Write a function named getPaymentLabel.
// It should accept PaymentState and return a string.

// Your code here:



// --------------------------------------------------

// Exercise 5:
// Create a literal union named DenyReason.
//
// It should allow:
// - "MISSING_ROLE"
// - "INSUFFICIENT_PERMISSION"
// - "ACCOUNT_DISABLED"
//
// Create a discriminated union named PermissionCheck.
//
// It should have:
//
// Allowed:
// - result: "allowed"
//
// Denied:
// - result: "denied"
// - reason: DenyReason
//
// Write a function named describePermission.
// It should accept PermissionCheck and return a string.

// Your code here:



// --------------------------------------------------

// Exercise 6:
// Create a discriminated union named LoginRequest.
//
// Email login:
// - type: "email"
// - email: string
// - password: string
//
// SSO login:
// - type: "sso"
// - provider: "google" | "github"
// - token: string
//
// Write a function named describeLoginRequest.
// It should accept LoginRequest and return a string.

// Your code here:



// --------------------------------------------------

// Exercise 7:
// Create a discriminated union named UploadState.
//
// It should have:
//
// Idle:
// - status: "idle"
//
// Uploading:
// - status: "uploading"
// - progress: number
//
// Uploaded:
// - status: "uploaded"
// - fileUrl: string
//
// Failed:
// - status: "failed"
// - error: string
//
// Write a function named getUploadMessage.
// It should accept UploadState and return a string.

// Your code here:



// --------------------------------------------------

// Exercise 8:
// Create a discriminated union named SecurityEvent.
//
// It should have:
//
// LoginSuccess:
// - type: "login_success"
// - actorUserId: string
// - ipAddress: string
// - createdAt: string
//
// LoginFailed:
// - type: "login_failed"
// - email: string
// - reason: "INVALID_PASSWORD" | "USER_NOT_FOUND"
// - ipAddress: string
// - createdAt: string
//
// PermissionDenied:
// - type: "permission_denied"
// - actorUserId: string
// - permission: string
// - createdAt: string
//
// Write a function named formatSecurityEvent.
// It should accept SecurityEvent and return a string.

// Your code here:



// --------------------------------------------------

// Exercise 9:
// Create a discriminated union named TaskState.
//
// It should have:
//
// Todo:
// - status: "todo"
//
// InProgress:
// - status: "in_progress"
// - assignedTo: string
//
// Done:
// - status: "done"
// - completedAt: string
//
// Write a function named getTaskLabel.
// Use switch.
// Add exhaustive checking with never in the default case.

// Your code here:



// --------------------------------------------------

// Exercise 10:
// Compare weak state vs discriminated union.
//
// First create a weak type named WeakOrderState:
//
// - isPaid: boolean
// - isShipped: boolean
// - isCancelled: boolean
// - trackingNumber?: string
// - cancelReason?: string
//
// Create one object that TypeScript accepts but is logically invalid.
//
// Then create a better discriminated union named OrderState:
//
// Created:
// - status: "created"
// - createdAt: string
//
// Paid:
// - status: "paid"
// - paidAt: string
//
// Shipped:
// - status: "shipped"
// - trackingNumber: string
//
// Cancelled:
// - status: "cancelled"
// - reason: string
//
// Create one valid OrderState object.

// Your code here: