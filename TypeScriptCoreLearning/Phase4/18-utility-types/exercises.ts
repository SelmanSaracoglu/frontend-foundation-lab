// 17-utility-types/exercises.ts

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

type Course = {
  id: string;
  title: string;
  description: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

// --------------------------------------------------
// Exercise 1:
// User type'ından sadece id, email ve name alanlarını alan
// PublicUser type'ını oluştur.
// --------------------------------------------------

type PublicUser = Pick<User, "id" | "email" | "name">;

const publicUser: PublicUser = {
  id: "u1",
  email: "ada@example.com",
  name: "Ada Lovelace",
};

console.log(publicUser);
// Expected output:
// { id: "u1", email: "ada@example.com", name: "Ada Lovelace" }

// --------------------------------------------------
// Exercise 2:
// Product type'ından id, createdAt ve updatedAt alanlarını çıkararak
// CreateProductRequest type'ını oluştur.
// --------------------------------------------------

type CreateProductRequest = Omit<Product, "id" | "createdAt" | "updatedAt">;

const createProductRequest: CreateProductRequest = {
  name: "Mouse",
  price: 60,
  isActive: true,
};

console.log(createProductRequest);
// Expected output:
// { name: "Mouse", price: 60, isActive: true }

// --------------------------------------------------
// Exercise 3:
// Course type'ından sadece title, description ve isPublished alanlarını seç.
// Sonra hepsini optional yapan UpdateCourseRequest type'ını oluştur.
// --------------------------------------------------

type UpdateCourseRequest = Partial<
  Pick<Course, "title" | "description" | "isPublished">
>;

const updateCourseTitle: UpdateCourseRequest = {
  title: "Advanced TypeScript Core",
};

const publishCourse: UpdateCourseRequest = {
  isPublished: true,
};

console.log(updateCourseTitle);
// Expected output:
// { title: "Advanced TypeScript Core" }

console.log(publishCourse);
// Expected output:
// { isPublished: true }

// --------------------------------------------------
// Exercise 4:
// RawSecurityConfig type'ındaki bütün optional alanları required yapan
// SecurityConfig type'ını oluştur.
// --------------------------------------------------

type RawSecurityConfig = {
  enableAuditLogs?: boolean;
  maxLoginAttempts?: number;
  passwordMinLength?: number;
};

type SecurityConfig = Required<RawSecurityConfig>;

const securityConfig: SecurityConfig = {
  enableAuditLogs: true,
  maxLoginAttempts: 5,
  passwordMinLength: 12,
};

console.log(securityConfig.passwordMinLength);
// Expected output: 12

// --------------------------------------------------
// Exercise 5:
// Session type'ını readonly hale getiren ImmutableSession type'ını oluştur.
// --------------------------------------------------

type Session = {
  userId: string;
  role: "admin" | "user";
  issuedAt: string;
};

type ImmutableSession = Readonly<Session>;

const immutableSession: ImmutableSession = {
  userId: "u1",
  role: "admin",
  issuedAt: "2026-05-10T10:00:00Z",
};

console.log(immutableSession.userId);
// Expected output: "u1"

// Bu compile olmamalı:
//
// immutableSession.role = "user";

// --------------------------------------------------
// Exercise 6:
// Role union type'ı için Record kullanarak roleLabels objesi oluştur.
// Bütün role değerleri karşılanmalı.
// --------------------------------------------------

type Role = "admin" | "user" | "guest";

const roleLabels: Record<Role, string> = {
  admin: "Administrator",
  user: "Regular User",
  guest: "Guest User",
};

console.log(roleLabels.guest);
// Expected output: "Guest User"

// --------------------------------------------------
// Exercise 7:
// Permission union type'ı için Record kullanarak permissionRiskLevels objesi oluştur.
// Value type sadece "low" | "medium" | "high" olabilir.
// --------------------------------------------------

type Permission = "users:read" | "users:create" | "users:delete";

type RiskLevel = "low" | "medium" | "high";

const permissionRiskLevels: Record<Permission, RiskLevel> = {
  "users:read": "low",
  "users:create": "medium",
  "users:delete": "high",
};

console.log(permissionRiskLevels["users:delete"]);
// Expected output: "high"

// --------------------------------------------------
// Exercise 8:
// MaybeRequestId type'ından null ve undefined ihtimallerini çıkaran
// RequestId type'ını oluştur.
// --------------------------------------------------

type MaybeRequestId = string | null | undefined;

type RequestId = NonNullable<MaybeRequestId>;

const requestId: RequestId = "req-123";

console.log(requestId);
// Expected output: "req-123"

// Bu compile olmamalı:
//
// const invalidRequestId: RequestId = undefined;

// --------------------------------------------------
// Exercise 9:
// createSession fonksiyonunun return type'ını ReturnType ile çıkar.
// Buna CreatedSession adını ver.
// --------------------------------------------------

function createSession(userId: string, role: "admin" | "user") {
  return {
    sessionId: "session-1",
    userId,
    role,
    createdAt: new Date().toISOString(),
  };
}

type CreatedSession = ReturnType<typeof createSession>;

const createdSession: CreatedSession = createSession("u1", "admin");

console.log(createdSession.role);
// Expected output: "admin"

// --------------------------------------------------
// Exercise 10:
// updateProduct fonksiyonunun parameter type'larını Parameters ile çıkar.
// Buna UpdateProductParams adını ver.
// --------------------------------------------------

function updateProduct(
  id: string,
  payload: Partial<Pick<Product, "name" | "price" | "isActive">>
): Product {
  return {
    id,
    name: payload.name ?? "Keyboard",
    price: payload.price ?? 120,
    isActive: payload.isActive ?? true,
    createdAt: "2026-05-10T10:00:00Z",
    updatedAt: "2026-05-10T11:00:00Z",
  };
}

type UpdateProductParams = Parameters<typeof updateProduct>;

const updateProductArgs: UpdateProductParams = [
  "p1",
  {
    price: 99,
  },
];

const updatedProduct = updateProduct(...updateProductArgs);

console.log(updatedProduct.price);
// Expected output: 99

// --------------------------------------------------
// Exercise 11:
// Güvenli bir CreateUserRequest oluştur.
// User type'ından role alanını client'a açma.
// Sadece email ve name alanlarını kabul et.
// --------------------------------------------------

type SafeCreateUserRequest = Pick<User, "email" | "name">;

const safeCreateUserRequest: SafeCreateUserRequest = {
  email: "linus@example.com",
  name: "Linus Torvalds",
};

console.log(safeCreateUserRequest);
// Expected output:
// { email: "linus@example.com", name: "Linus Torvalds" }