// phase-1-review/exercises.ts

// Exercise 1
// Create an array named auditLogs.
// Each audit log should have:
// - readonly id: string
// - action: string
// - actorEmail: string
// - success: boolean
//
// Add at least three logs.

// Write your code here:


// --------------------------------------------------

// Exercise 2
// Create a function named getFailedAuditLogs.
// It should accept the auditLogs array.
// It should return only logs where success is false.

// Write your code here:


// --------------------------------------------------

// Exercise 3
// Create a function named getActorEmailsFromLogs.
// It should accept the auditLogs array.
// It should return only actorEmail values as string[].

// Write your code here:


// --------------------------------------------------

// Exercise 4
// Create a Set named sensitiveActions.
// It should include:
// - "DELETE_USER"
// - "CHANGE_ROLE"
// - "READ_AUDIT_LOG"
//
// Create a function named isSensitiveAction.
// It should accept action: string.
// It should return boolean.

// Write your code here:


// --------------------------------------------------

// Exercise 5
// Create a Record named actionLabels.
// Keys should be exactly:
// - "LOGIN"
// - "DELETE_USER"
// - "CHANGE_ROLE"
// - "READ_AUDIT_LOG"
//
// Values should be readable labels.
// Example:
// LOGIN -> "User login"

// Write your code here:


// --------------------------------------------------

// Exercise 6
// Create a Map named logsById.
// Key should be log id.
// Value should be the full audit log object.
//
// Fill the map using the auditLogs array.

// Write your code here:


// --------------------------------------------------

// Exercise 7
// Create a function named printAuditLogById.
// It should accept:
// - id: string
//
// It should use logsById.get(id).
// If log is not found, print:
// "Audit log not found"
//
// Otherwise print:
// "admin@example.com performed LOGIN"

// Write your code here:


// --------------------------------------------------

// Exercise 8
// Reflection question:
//
// In the exercises above, you probably repeated this object shape many times:
//
// {
//   readonly id: string;
//   action: string;
//   actorEmail: string;
//   success: boolean;
// }
//
// Why is this repetition a problem in a real project?
//
// Write your answer as a comment below: