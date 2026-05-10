// 18-keyof-indexed-access-typeof/exercises.ts

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

type Course = {
  id: string;
  title: string;
  status: "draft" | "published" | "archived";
  studentCount: number;
};

// --------------------------------------------------
// Exercise 1:
// User type'ının key'lerinden UserKey type'ı oluştur.
// --------------------------------------------------

type UserKey = keyof User;

const userKey: UserKey = "email";

console.log(userKey);
// Expected output: "email"

// Bu compile olmamalı:
//
// const invalidUserKey: UserKey = "password";

// --------------------------------------------------
// Exercise 2:
// User type'ından sadece email ve name alanlarını sort edilebilir kabul et.
// UserSortableField type'ını oluştur.
// --------------------------------------------------

type UserSortableField = keyof Pick<User, "email" | "name">;

const sortableField: UserSortableField = "name";

console.log(sortableField);
// Expected output: "name"

// Bu compile olmamalı:
//
// const invalidSortableField: UserSortableField = "role";

// --------------------------------------------------
// Exercise 3:
// User type'ındaki role alanının value type'ını UserRole olarak çıkar.
// --------------------------------------------------

type UserRole = User["role"];

const role: UserRole = "admin";

console.log(role);
// Expected output: "admin"

// Bu compile olmamalı:
//
// const invalidRole: UserRole = "guest";

// --------------------------------------------------
// Exercise 4:
// Product type'ından name, price ve isActive alanlarının value type'larını
// ProductEditableValue olarak çıkar.
// --------------------------------------------------

type ProductEditableValue = Product["name" | "price" | "isActive"];

const productNameValue: ProductEditableValue = "Keyboard";
const productPriceValue: ProductEditableValue = 120;
const productStatusValue: ProductEditableValue = true;

console.log(productNameValue);
console.log(productPriceValue);
console.log(productStatusValue);
// Expected output:
// "Keyboard"
// 120
// true

// --------------------------------------------------
// Exercise 5:
// getValue adında generic bir helper yaz.
// item ve key alsın.
// key sadece item'ın geçerli key'lerinden biri olsun.
// return type verilen key'in value type'ı olsun.
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
const userIsActive = getValue(user, "isActive");

console.log(userEmail);
console.log(userIsActive);
// Expected output:
// "ada@example.com"
// true

// Bu compile olmamalı:
//
// getValue(user, "missingField");

// --------------------------------------------------
// Exercise 6:
// setValue adında generic bir helper yaz.
// item, key ve value alsın.
// value type'ı verilen key'in value type'ı ile uyumlu olmalı.
// Yeni object döndürmeli.
// --------------------------------------------------

function setValue<T, K extends keyof T>(item: T, key: K, value: T[K]): T {
  return {
    ...item,
    [key]: value,
  };
}

const renamedUser = setValue(user, "name", "Ada L.");
const deactivatedUser = setValue(user, "isActive", false);

console.log(renamedUser.name);
console.log(deactivatedUser.isActive);
// Expected output:
// "Ada L."
// false

// Bu compile olmamalı:
//
// setValue(user, "isActive", "false");

// --------------------------------------------------
// Exercise 7:
// defaultSecurityConfig objesinden typeof ile SecurityConfig type'ı üret.
// --------------------------------------------------

const defaultSecurityConfig = {
  enableAuditLogs: true,
  maxLoginAttempts: 5,
  passwordMinLength: 12,
};

type SecurityConfig = typeof defaultSecurityConfig;

const securityConfig: SecurityConfig = {
  enableAuditLogs: false,
  maxLoginAttempts: 3,
  passwordMinLength: 10,
};

console.log(securityConfig.maxLoginAttempts);
// Expected output: 3

// --------------------------------------------------
// Exercise 8:
// permissionDescriptions objesinden keyof typeof kullanarak Permission type'ı üret.
// --------------------------------------------------

const permissionDescriptions = {
  "courses:read": "Can view courses",
  "courses:create": "Can create courses",
  "courses:delete": "Can delete courses",
};

type Permission = keyof typeof permissionDescriptions;

const permission: Permission = "courses:create";

console.log(permissionDescriptions[permission]);
// Expected output: "Can create courses"

// Bu compile olmamalı:
//
// const invalidPermission: Permission = "courses:update";

// --------------------------------------------------
// Exercise 9:
// roleMap object'inden RoleValue type'ı üret.
// RoleValue sadece "admin" | "user" | "guest" olmalı.
// --------------------------------------------------

const roleMap = {
  admin: "admin",
  user: "user",
  guest: "guest",
} as const;

type RoleValue = (typeof roleMap)[keyof typeof roleMap];

const roleValue: RoleValue = "guest";

console.log(roleValue);
// Expected output: "guest"

// Bu compile olmamalı:
//
// const invalidRoleValue: RoleValue = "superadmin";

// --------------------------------------------------
// Exercise 10:
// allowedCourseStatuses array'inden CourseStatus type'ı üret.
// CourseStatus sadece array'deki değerlerden biri olmalı.
// --------------------------------------------------

const allowedCourseStatuses = ["draft", "published", "archived"] as const;

type CourseStatus = (typeof allowedCourseStatuses)[number];

const courseStatus: CourseStatus = "published";

console.log(courseStatus);
// Expected output: "published"

// Bu compile olmamalı:
//
// const invalidCourseStatus: CourseStatus = "deleted";

// --------------------------------------------------
// Exercise 11:
// Course type'ından sadece title ve status alanlarını public field kabul et.
// CoursePublicField type'ı oluştur.
// publicCourseFields array'ini bu type ile güvenli hale getir.
// --------------------------------------------------

type CoursePublicField = keyof Pick<Course, "title" | "status">;

const publicCourseFields: CoursePublicField[] = ["title", "status"];

console.log(publicCourseFields);
// Expected output:
// ["title", "status"]

// Bu compile olmamalı:
//
// const invalidPublicCourseFields: CoursePublicField[] = ["title", "studentCount"];

// --------------------------------------------------
// Exercise 12:
// getCourseFieldValue adında bir fonksiyon yaz.
// Course ve CoursePublicField alsın.
// İlgili field value'sunu dönsün.
// --------------------------------------------------

function getCourseFieldValue(
  course: Course,
  field: CoursePublicField
): Course[CoursePublicField] {
  return course[field];
}

const course: Course = {
  id: "c1",
  title: "TypeScript Core",
  status: "published",
  studentCount: 120,
};

const courseTitle = getCourseFieldValue(course, "title");
const courseStatusValue = getCourseFieldValue(course, "status");

console.log(courseTitle);
console.log(courseStatusValue);
// Expected output:
// "TypeScript Core"
// "published"