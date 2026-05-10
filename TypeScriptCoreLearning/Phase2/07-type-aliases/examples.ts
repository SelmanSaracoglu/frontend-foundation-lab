// 07-type-aliases/examples.ts

// Example 1: Basic primitive alias

type UserId = string;

const adminId: UserId = "user-001";

console.log("Admin ID:", adminId);

// Expected output:
// Admin ID: user-001

// --------------------------------------------------

// Example 2: Object type alias

type User = {
  readonly id: string;
  email: string;
  isActive: boolean;
};

const user: User = {
  id: "u1",
  email: "admin@example.com",
  isActive: true,
};

console.log("User email:", user.email);

// Expected output:
// User email: admin@example.com

// This is allowed:
user.email = "new-admin@example.com";

// This would cause a TypeScript error:
// user.id = "u2";

// --------------------------------------------------

// Example 3: Type alias as a function parameter

function deactivateUser(targetUser: User): User {
  return {
    ...targetUser,
    isActive: false,
  };
}

const deactivatedUser = deactivateUser(user);

console.log("Deactivated user:", deactivatedUser);

// Expected behavior:
// Returns a new User object with isActive set to false.

// --------------------------------------------------

// Example 4: Type alias as a return type

type ApiResult = {
  success: boolean;
  message: string;
};

function createSuccessResult(message: string): ApiResult {
  return {
    success: true,
    message,
  };
}

const result = createSuccessResult("User created successfully");

console.log("API result:", result);

// Expected output:
// API result: { success: true, message: "User created successfully" }

// --------------------------------------------------

// Example 5: Optional property

type UserProfile = {
  id: string;
  displayName: string;
  avatarUrl?: string;
};

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

// Example 6: Array of type alias

type Course = {
  id: string;
  title: string;
  isPublished: boolean;
};

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
// Only courses where isPublished is true are returned.

// --------------------------------------------------

// Example 7: Nested type aliases

type Address = {
  city: string;
  country: string;
};

type Customer = {
  id: string;
  email: string;
  address: Address;
};

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

// Example 8: Type composition with intersection

type AuditFields = {
  createdAt: string;
  updatedAt: string;
};

type Product = {
  readonly id: string;
  name: string;
  price: number;
} & AuditFields;

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

// Example 9: Request model

type CreateUserRequest = {
  email: string;
  password: string;
  displayName: string;
};

function createUser(request: CreateUserRequest): ApiResult {
  console.log("Creating user:", request.email);

  return {
    success: true,
    message: `User ${request.displayName} created`,
  };
}

const createUserResult = createUser({
  email: "new-user@example.com",
  password: "secure-password",
  displayName: "New User",
});

console.log(createUserResult);

// Expected behavior:
// The function accepts a CreateUserRequest shape and returns an ApiResult.

// --------------------------------------------------

// Example 10: Primitive aliases do not validate data

type Email = string;

const invalidEmail: Email = "not-an-email";

console.log("Email value:", invalidEmail);

// Expected behavior:
// TypeScript allows this because Email is still just a string.
// Type alias improves meaning, but does not validate format.