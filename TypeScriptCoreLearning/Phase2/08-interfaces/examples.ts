// 08-interfaces/examples.ts

// Example 1: Basic interface

interface User {
  readonly id: string;
  email: string;
  isActive: boolean;
}

const user: User = {
  id: "user-1",
  email: "admin@example.com",
  isActive: true,
};

console.log("User:", user);

// Expected output:
// User object with id, email, and isActive.

// This is allowed:
user.email = "new-admin@example.com";

// This would cause a TypeScript error:
// user.id = "user-2";

// --------------------------------------------------

// Example 2: Interface as a function parameter

function deactivateUser(targetUser: User): User {
  return {
    ...targetUser,
    isActive: false,
  };
}

const inactiveUser = deactivateUser(user);

console.log("Inactive user:", inactiveUser);

// Expected behavior:
// Returns a User object with isActive set to false.

// --------------------------------------------------

// Example 3: Interface as return type

interface ApiResponse {
  success: boolean;
  message: string;
}

function createSuccessResponse(message: string): ApiResponse {
  return {
    success: true,
    message,
  };
}

const response = createSuccessResponse("Operation completed");

console.log("Response:", response);

// Expected output:
// Response: { success: true, message: "Operation completed" }

// --------------------------------------------------

// Example 4: Optional property

interface UserProfile {
  readonly id: string;
  displayName: string;
  avatarUrl?: string;
}

const profileWithoutAvatar: UserProfile = {
  id: "profile-1",
  displayName: "Ada",
};

const profileWithAvatar: UserProfile = {
  id: "profile-2",
  displayName: "Grace",
  avatarUrl: "https://example.com/avatar.png",
};

console.log("Profile without avatar:", profileWithoutAvatar);
console.log("Profile with avatar:", profileWithAvatar);

// Expected behavior:
// Both objects are valid UserProfile values.

// --------------------------------------------------

// Example 5: Nested interfaces

interface Address {
  city: string;
  country: string;
}

interface Customer {
  readonly id: string;
  email: string;
  address: Address;
}

const customer: Customer = {
  id: "customer-1",
  email: "customer@example.com",
  address: {
    city: "Berlin",
    country: "Germany",
  },
};

console.log("Customer city:", customer.address.city);

// Expected output:
// Customer city: Berlin

// --------------------------------------------------

// Example 6: Array of interfaces

interface Course {
  readonly id: string;
  title: string;
  isPublished: boolean;
}

const courses: Course[] = [
  {
    id: "course-1",
    title: "TypeScript Core",
    isPublished: true,
  },
  {
    id: "course-2",
    title: "React with TypeScript",
    isPublished: false,
  },
];

const publishedCourses = courses.filter((course) => course.isPublished);

console.log("Published courses:", publishedCourses);

// Expected behavior:
// Only published courses are returned.

// --------------------------------------------------

// Example 7: Interface extends

interface AuditFields {
  createdAt: string;
  updatedAt: string;
}

interface Product extends AuditFields {
  readonly id: string;
  name: string;
  price: number;
}

const product: Product = {
  id: "product-1",
  name: "Mechanical Keyboard",
  price: 150,
  createdAt: "2026-01-01",
  updatedAt: "2026-01-02",
};

console.log("Product:", product);

// Expected behavior:
// Product must include id, name, price, createdAt, and updatedAt.

// --------------------------------------------------

// Example 8: Extending a domain model

interface BaseUser {
  readonly id: string;
  email: string;
  displayName: string;
}

interface AdminUser extends BaseUser {
  permissions: string[];
}

const adminUser: AdminUser = {
  id: "admin-1",
  email: "admin@example.com",
  displayName: "Admin User",
  permissions: ["users:read", "users:delete"],
};

console.log("Admin permissions:", adminUser.permissions);

// Expected output:
// Admin permissions: ["users:read", "users:delete"]

// --------------------------------------------------

// Example 9: Declaration merging

interface SecurityEvent {
  readonly id: string;
}

interface SecurityEvent {
  actorUserId: string;
  action: string;
  createdAt: string;
}

const securityEvent: SecurityEvent = {
  id: "event-1",
  actorUserId: "user-1",
  action: "LOGIN_SUCCESS",
  createdAt: "2026-01-01T10:00:00Z",
};

console.log("Security event:", securityEvent);

// Expected behavior:
// TypeScript merges both SecurityEvent interface declarations.

// Note:
// This is useful in some library scenarios,
// but in application code, prefer defining one clear interface in one place.

// --------------------------------------------------

// Example 10: Interface does not validate runtime values

interface LoginRequest {
  email: string;
  password: string;
}

const loginRequest: LoginRequest = {
  email: "not-an-email",
  password: "123456",
};

console.log("Login request:", loginRequest);

// Expected behavior:
// TypeScript allows this because email is still just a string.
// Interface does not validate email format at runtime.