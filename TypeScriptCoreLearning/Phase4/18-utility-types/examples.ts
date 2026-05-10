// 17-utility-types/examples.ts

// --------------------------------------------------
// Base models
// --------------------------------------------------

type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// --------------------------------------------------
// Example 1: Pick<T, K>
// --------------------------------------------------

type UserSummary = Pick<User, "id" | "email" | "name">;

const userSummary: UserSummary = {
  id: "u1",
  email: "ada@example.com",
  name: "Ada Lovelace",
};

console.log(userSummary);
// Expected output:
// { id: "u1", email: "ada@example.com", name: "Ada Lovelace" }

// --------------------------------------------------
// Example 2: Omit<T, K>
// --------------------------------------------------

type CreateProductRequest = Omit<Product, "id" | "createdAt" | "updatedAt">;

const createProductRequest: CreateProductRequest = {
  name: "Mechanical Keyboard",
  price: 120,
  isActive: true,
};

console.log(createProductRequest);
// Expected output:
// { name: "Mechanical Keyboard", price: 120, isActive: true }

// --------------------------------------------------
// Example 3: Partial<T>
// --------------------------------------------------

type UpdateProductRequest = Partial<
  Pick<Product, "name" | "price" | "isActive">
>;

const updateProductPrice: UpdateProductRequest = {
  price: 99,
};

const deactivateProduct: UpdateProductRequest = {
  isActive: false,
};

console.log(updateProductPrice);
// Expected output:
// { price: 99 }

console.log(deactivateProduct);
// Expected output:
// { isActive: false }

// --------------------------------------------------
// Example 4: Required<T>
// --------------------------------------------------

type RawAppConfig = {
  apiUrl?: string;
  timeoutMs?: number;
  enableSecurityLogging?: boolean;
};

type AppConfig = Required<RawAppConfig>;

const appConfig: AppConfig = {
  apiUrl: "https://api.example.com",
  timeoutMs: 5000,
  enableSecurityLogging: true,
};

console.log(appConfig.enableSecurityLogging);
// Expected output: true

// --------------------------------------------------
// Example 5: Readonly<T>
// --------------------------------------------------

type Session = {
  userId: string;
  role: "admin" | "user";
  issuedAt: string;
};

type ReadonlySession = Readonly<Session>;

const session: ReadonlySession = {
  userId: "u1",
  role: "admin",
  issuedAt: "2026-05-10T10:00:00Z",
};

console.log(session.role);
// Expected output: "admin"

// This would not compile:
//
// session.role = "user";

// --------------------------------------------------
// Example 6: Record<K, T>
// --------------------------------------------------

type Role = "admin" | "user" | "guest";

const roleLabels: Record<Role, string> = {
  admin: "Administrator",
  user: "Regular User",
  guest: "Guest User",
};

console.log(roleLabels.admin);
// Expected output: "Administrator"

type Permission = "users:read" | "users:create" | "users:delete";

const permissionDescriptions: Record<Permission, string> = {
  "users:read": "Can view users",
  "users:create": "Can create users",
  "users:delete": "Can delete users",
};

console.log(permissionDescriptions["users:delete"]);
// Expected output: "Can delete users"

// --------------------------------------------------
// Example 7: NonNullable<T>
// --------------------------------------------------

type MaybeEmail = string | null | undefined;

type SafeEmail = NonNullable<MaybeEmail>;

const email: SafeEmail = "ada@example.com";

console.log(email.toUpperCase());
// Expected output: "ADA@EXAMPLE.COM"

// This would not compile:
//
// const invalidEmail: SafeEmail = null;

// --------------------------------------------------
// Example 8: ReturnType<T>
// --------------------------------------------------

function createAuditLog(userId: string, action: string) {
  return {
    id: "log-1",
    userId,
    action,
    createdAt: new Date().toISOString(),
  };
}

type AuditLog = ReturnType<typeof createAuditLog>;

const auditLog: AuditLog = createAuditLog("u1", "users:create");

console.log(auditLog.action);
// Expected output: "users:create"

// --------------------------------------------------
// Example 9: Parameters<T>
// --------------------------------------------------

function updateUser(
  id: string,
  payload: Partial<Pick<User, "email" | "name">>
): User {
  return {
    id,
    email: payload.email ?? "ada@example.com",
    name: payload.name ?? "Ada Lovelace",
    role: "user",
    createdAt: "2026-05-10T10:00:00Z",
    updatedAt: "2026-05-10T11:00:00Z",
  };
}

type UpdateUserParams = Parameters<typeof updateUser>;

const updateArgs: UpdateUserParams = [
  "u1",
  {
    name: "Ada L.",
  },
];

const updatedUser = updateUser(...updateArgs);

console.log(updatedUser.name);
// Expected output: "Ada L."

// --------------------------------------------------
// Example 10: Combining utility types safely
// --------------------------------------------------

// Security note:
// Using Omit<User, "id" | "createdAt" | "updatedAt"> would leave "role" inside.
// That may be unsafe if normal users should not assign their own role.

type SafeCreateUserRequest = Pick<User, "email" | "name">;

const safeCreateUserRequest: SafeCreateUserRequest = {
  email: "grace@example.com",
  name: "Grace Hopper",
};

console.log(safeCreateUserRequest);
// Expected output:
// { email: "grace@example.com", name: "Grace Hopper" }

type SafeUpdateUserRequest = Partial<Pick<User, "email" | "name">>;

const safeUpdateUserRequest: SafeUpdateUserRequest = {
  email: "new-grace@example.com",
};

console.log(safeUpdateUserRequest);
// Expected output:
// { email: "new-grace@example.com" }