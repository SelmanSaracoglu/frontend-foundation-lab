// 09-unions-and-narrowing/exercises.ts

// Exercise 1:
// Create a type alias named Id.
// It should allow string or number.
//
// Create two variables:
// - one string id
// - one number id

// Your code here:



// --------------------------------------------------

// Exercise 2:
// Create a literal union type named UserRole.
// It should allow only:
// - "admin"
// - "user"
// - "support"
//
// Create one valid role variable.
//
// Then add a commented-out invalid role example.

// Your code here:



// --------------------------------------------------

// Exercise 3:
// Create a literal union type named OrderStatus.
// It should allow:
// - "pending"
// - "paid"
// - "shipped"
// - "cancelled"
//
// Create a type alias named Order.
// It should have:
// - readonly id: string
// - customerEmail: string
// - status: OrderStatus
//
// Create one valid Order object.

// Your code here:



// --------------------------------------------------

// Exercise 4:
// Write a function named formatId.
// It should accept Id.
// It should return string.
//
// If the id is a string:
// - return it in uppercase
//
// If the id is a number:
// - return it as a string using toString()

// Your code here:



// --------------------------------------------------

// Exercise 5:
// Write a function named getRoleLabel.
// It should accept UserRole.
// It should return string.
//
// Rules:
// - "admin" -> "Administrator"
// - "support" -> "Support Agent"
// - "user" -> "Regular User"

// Your code here:



// --------------------------------------------------

// Exercise 6:
// Create a type alias named CurrentUser.
// It should have:
// - readonly id: string
// - email: string
//
// Write a function named printUserEmail.
// It should accept CurrentUser | null.
// If user is null, print "No user logged in".
// Otherwise print the user's email.

// Your code here:



// --------------------------------------------------

// Exercise 7:
// Create a type alias named UserProfile.
// It should have:
// - readonly id: string
// - displayName: string
// - avatarUrl?: string
//
// Write a function named getAvatarLabel.
// It should accept UserProfile.
// It should return:
// - "No avatar" if avatarUrl is missing
// - avatarUrl in uppercase if it exists

// Your code here:



// --------------------------------------------------

// Exercise 8:
// Create these type aliases:
//
// EmailLoginRequest:
// - email: string
// - password: string
//
// SsoLoginRequest:
// - provider: "google" | "github"
// - token: string
//
// LoginRequest:
// - EmailLoginRequest | SsoLoginRequest
//
// Write a function named describeLoginRequest.
// It should accept LoginRequest.
// If it is an email login request, return:
// "Email login: user@example.com"
//
// If it is an SSO login request, return:
// "SSO login: github" or "SSO login: google"
//
// Hint:
// Use the "in" operator.

// Your code here:



// --------------------------------------------------

// Exercise 9:
// Create a safer API result union.
//
// SuccessResult:
// - success: true
// - data: string
//
// ErrorResult:
// - success: false
// - error: string
//
// ApiResult:
// - SuccessResult | ErrorResult
//
// Write a function named printResult.
// It should accept ApiResult.
// If success is true, print data.
// Otherwise print error.

// Your code here:



// --------------------------------------------------

// Exercise 10:
// Create a literal union type named SecurityAction.
// It should allow only:
// - "LOGIN_SUCCESS"
// - "LOGIN_FAILED"
// - "PASSWORD_RESET_REQUESTED"
// - "PERMISSION_DENIED"
//
// Create a type alias named SecurityLog.
// It should have:
// - readonly id: string
// - actorUserId: string
// - action: SecurityAction
// - createdAt: string
//
// Create one valid SecurityLog object.
//
// Then add a commented-out invalid SecurityLog example with an unsupported action.

// Your code here: