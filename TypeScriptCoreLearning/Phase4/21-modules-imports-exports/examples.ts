// 19-modules-imports-exports/examples.ts

// NOTE:
// Normalde bu milestone'daki kodlar birden fazla dosyaya bölünür.
// Repo formatımız bu aşamada examples.ts kullandığı için,
// aşağıda her dosyayı yorum başlığıyla temsil ediyoruz.

// --------------------------------------------------
// File: src/models/user.ts
// --------------------------------------------------

export const USER_ROLES = ["admin", "user"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
};

export type PublicUser = Pick<User, "id" | "email" | "name">;

export type CreateUserRequest = Pick<User, "email" | "name">;

export type UpdateUserRequest = Partial<Pick<User, "email" | "name" | "isActive">>;

export function isAdmin(user: User): boolean {
  return user.role === "admin";
}

// Internal helper.
// Export edilmediği için normalde sadece bu dosya içinde kullanılır.
function createUserId(): string {
  return "u1";
}

export function createUser(request: CreateUserRequest): User {
  return {
    id: createUserId(),
    email: request.email.trim().toLowerCase(),
    name: request.name,
    role: "user",
    isActive: true,
    createdAt: new Date().toISOString(),
  };
}

// --------------------------------------------------
// File: src/models/product.ts
// --------------------------------------------------

export type Product = {
  id: string;
  name: string;
  price: number;
  isActive: boolean;
  createdAt: string;
};

export type CreateProductRequest = Pick<Product, "name" | "price">;

export type UpdateProductRequest = Partial<
  Pick<Product, "name" | "price" | "isActive">
>;

export function createProduct(request: CreateProductRequest): Product {
  return {
    id: "p1",
    name: request.name,
    price: request.price,
    isActive: true,
    createdAt: new Date().toISOString(),
  };
}

// --------------------------------------------------
// File: src/types/api.ts
// --------------------------------------------------

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  requestId: string;
};

export type ApiError = {
  code: string;
  message: string;
};

export type ApiResult<TData, TError = ApiError> =
  | {
      success: true;
      data: TData;
      requestId: string;
    }
  | {
      success: false;
      error: TError;
      requestId: string;
    };

// --------------------------------------------------
// File: src/utils/email.ts
// --------------------------------------------------

function hasAtSymbol(email: string): boolean {
  return email.includes("@");
}

export function normalizeEmail(email: string): string {
  if (!hasAtSymbol(email)) {
    throw new Error("Invalid email format");
  }

  return email.trim().toLowerCase();
}

// --------------------------------------------------
// File: src/permissions/permissions.ts
// --------------------------------------------------

export const PERMISSION_DESCRIPTIONS = {
  "users:read": "Can view users",
  "users:create": "Can create users",
  "users:delete": "Can delete users",
} as const;

export type Permission = keyof typeof PERMISSION_DESCRIPTIONS;

export type PermissionRiskLevel = "low" | "medium" | "high";

export const PERMISSION_RISK_LEVELS: Record<Permission, PermissionRiskLevel> = {
  "users:read": "low",
  "users:create": "medium",
  "users:delete": "high",
};

export function getPermissionDescription(permission: Permission): string {
  return PERMISSION_DESCRIPTIONS[permission];
}

// --------------------------------------------------
// File: src/index.ts
// --------------------------------------------------

// In a real project, this file could re-export public module API:
//
// export type {
//   User,
//   UserRole,
//   PublicUser,
//   CreateUserRequest,
//   UpdateUserRequest,
// } from "./models/user";
//
// export {
//   USER_ROLES,
//   createUser,
//   isAdmin,
// } from "./models/user";
//
// export type {
//   Product,
//   CreateProductRequest,
//   UpdateProductRequest,
// } from "./models/product";
//
// export {
//   createProduct,
// } from "./models/product";
//
// export type {
//   ApiResponse,
//   ApiError,
//   ApiResult,
// } from "./types/api";
//
// export {
//   normalizeEmail,
// } from "./utils/email";
//
// export type {
//   Permission,
//   PermissionRiskLevel,
// } from "./permissions/permissions";
//
// export {
//   PERMISSION_DESCRIPTIONS,
//   PERMISSION_RISK_LEVELS,
//   getPermissionDescription,
// } from "./permissions/permissions";

// --------------------------------------------------
// Example usage
// --------------------------------------------------

const user = createUser({
  email: " ADA@example.com ",
  name: "Ada Lovelace",
});

console.log(user.email);
// Expected output: "ada@example.com"

console.log(isAdmin(user));
// Expected output: false

const product = createProduct({
  name: "Keyboard",
  price: 120,
});

console.log(product.name);
// Expected output: "Keyboard"

const userResponse: ApiResponse<User> = {
  success: true,
  data: user,
  requestId: "req-123",
};

console.log(userResponse.data.name);
// Expected output: "Ada Lovelace"

const result: ApiResult<Product> = {
  success: true,
  data: product,
  requestId: "req-456",
};

if (result.success) {
  console.log(result.data.price);
}
// Expected output: 120

const normalizedEmail = normalizeEmail(" GRACE@example.com ");

console.log(normalizedEmail);
// Expected output: "grace@example.com"

const permission: Permission = "users:create";

console.log(getPermissionDescription(permission));
// Expected output: "Can create users"

console.log(PERMISSION_RISK_LEVELS["users:delete"]);
// Expected output: "high"

// This would not compile:
//
// const invalidPermission: Permission = "users:update";