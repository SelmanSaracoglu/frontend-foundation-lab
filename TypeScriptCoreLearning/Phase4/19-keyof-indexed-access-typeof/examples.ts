// 18-keyof-indexed-access-typeof/examples.ts

// --------------------------------------------------
// Base models
// --------------------------------------------------

type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  isActive: boolean;
};

type Product = {
  id: string;
  name: string;
  price: number;
  isActive: boolean;
};

// --------------------------------------------------
// Example 1: keyof
// --------------------------------------------------

type UserKey = keyof User;
// Equivalent to:
// "id" | "email" | "name" | "role" | "isActive"

const userKey: UserKey = "email";

console.log(userKey);
// Expected output: "email"

// This would not compile:
//
// const invalidUserKey: UserKey = "password";

// --------------------------------------------------
// Example 2: keyof with Pick
// --------------------------------------------------

type UserSortableField = keyof Pick<User, "email" | "name">;

const sortableField: UserSortableField = "name";

console.log(sortableField);
// Expected output: "name"

// This would not compile:
//
// const invalidSortableField: UserSortableField = "role";

// --------------------------------------------------
// Example 3: Indexed access type
// --------------------------------------------------

type UserEmail = User["email"];
type UserRole = User["role"];
type UserStatus = User["isActive"];

const email: UserEmail = "ada@example.com";
const role: UserRole = "admin";
const isActive: UserStatus = true;

console.log(email);
console.log(role);
console.log(isActive);
// Expected output:
// "ada@example.com"
// "admin"
// true

// --------------------------------------------------
// Example 4: Multiple indexed access
// --------------------------------------------------

type ProductEditableValue = Product["name" | "price" | "isActive"];

const editableName: ProductEditableValue = "Keyboard";
const editablePrice: ProductEditableValue = 120;
const editableStatus: ProductEditableValue = true;

console.log(editableName);
console.log(editablePrice);
console.log(editableStatus);
// Expected output:
// "Keyboard"
// 120
// true

// --------------------------------------------------
// Example 5: Generic getValue helper
// --------------------------------------------------

function getValue<T, K extends keyof T>(item: T, key: K): T[K] {
  return item[key];
}

const user: User = {
  id: "u1",
  email: "ada@example.com",
  name: "Ada Lovelace",
  role: "admin",
  isActive: true,
};

const userEmail = getValue(user, "email");
const userRole = getValue(user, "role");
const userIsActive = getValue(user, "isActive");

console.log(userEmail);
console.log(userRole);
console.log(userIsActive);
// Expected output:
// "ada@example.com"
// "admin"
// true

// This would not compile:
//
// getValue(user, "password");

// --------------------------------------------------
// Example 6: Generic setValue helper
// --------------------------------------------------

function setValue<T, K extends keyof T>(item: T, key: K, value: T[K]): T {
  return {
    ...item,
    [key]: value,
  };
}

const updatedUserEmail = setValue(user, "email", "new-ada@example.com");
const updatedUserStatus = setValue(user, "isActive", false);

console.log(updatedUserEmail.email);
console.log(updatedUserStatus.isActive);
// Expected output:
// "new-ada@example.com"
// false

// This would not compile:
//
// setValue(user, "isActive", "yes");

// --------------------------------------------------
// Example 7: typeof from runtime value
// --------------------------------------------------

const defaultConfig = {
  apiUrl: "https://api.example.com",
  timeoutMs: 5000,
  enableAuditLogs: true,
};

type AppConfig = typeof defaultConfig;

const config: AppConfig = {
  apiUrl: "https://staging-api.example.com",
  timeoutMs: 3000,
  enableAuditLogs: false,
};

console.log(config.apiUrl);
// Expected output: "https://staging-api.example.com"

// --------------------------------------------------
// Example 8: keyof typeof
// --------------------------------------------------

const permissionDescriptions = {
  "users:read": "Can view users",
  "users:create": "Can create users",
  "users:delete": "Can delete users",
};

type Permission = keyof typeof permissionDescriptions;

const permission: Permission = "users:create";

console.log(permissionDescriptions[permission]);
// Expected output: "Can create users"

// This would not compile:
//
// const invalidPermission: Permission = "users:update";

// --------------------------------------------------
// Example 9: as const with object values
// --------------------------------------------------

const roleMap = {
  admin: "admin",
  user: "user",
  guest: "guest",
} as const;

type RoleKey = keyof typeof roleMap;
type RoleValue = (typeof roleMap)[keyof typeof roleMap];

const roleKey: RoleKey = "admin";
const roleValue: RoleValue = "guest";

console.log(roleKey);
console.log(roleValue);
// Expected output:
// "admin"
// "guest"

// --------------------------------------------------
// Example 10: Array value union with as const
// --------------------------------------------------

const allowedStatuses = ["draft", "published", "archived"] as const;

type CourseStatus = (typeof allowedStatuses)[number];

const courseStatus: CourseStatus = "published";

console.log(courseStatus);
// Expected output: "published"

// This would not compile:
//
// const invalidCourseStatus: CourseStatus = "deleted";

// --------------------------------------------------
// Example 11: Type-safe field selection
// --------------------------------------------------

type UserPublicField = keyof Pick<User, "id" | "email" | "name">;

const publicUserFields: UserPublicField[] = ["id", "email", "name"];

function selectUserPublicFields(user: User): Pick<User, UserPublicField> {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

const publicUser = selectUserPublicFields(user);

console.log(publicUser);
// Expected output:
// { id: "u1", email: "ada@example.com", name: "Ada Lovelace" }