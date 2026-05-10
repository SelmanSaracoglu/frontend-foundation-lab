// 19-modules-imports-exports/exercises.ts

// NOTE:
// Normalde bu exercise kodları birden fazla dosyaya bölünür.
// Repo formatımız bu aşamada exercises.ts kullandığı için,
// dosyaları yorum başlıklarıyla temsil ediyoruz.

// --------------------------------------------------
// Exercise 1:
// File: src/models/course.ts
//
// Course modelini ve ilişkili request type'larını export et.
// --------------------------------------------------

export const COURSE_STATUSES = ["draft", "published", "archived"] as const;

export type CourseStatus = (typeof COURSE_STATUSES)[number];

export type Course = {
  id: string;
  title: string;
  description: string;
  status: CourseStatus;
  studentCount: number;
  createdAt: string;
  updatedAt: string;
};

export type PublicCourse = Pick<Course, "id" | "title" | "status">;

export type CreateCourseRequest = Pick<Course, "title" | "description">;

export type UpdateCourseRequest = Partial<
  Pick<Course, "title" | "description" | "status">
>;

export function createCourse(request: CreateCourseRequest): Course {
  return {
    id: "c1",
    title: request.title,
    description: request.description,
    status: "draft",
    studentCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// --------------------------------------------------
// Exercise 2:
// File: src/types/api.ts
//
// Generic ApiResponse ve ApiResult type'larını export et.
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
// Exercise 3:
// File: src/utils/text.ts
//
// normalizeTitle function'ını export et.
// Internal helper function'ı export etme.
// --------------------------------------------------

function collapseSpaces(value: string): string {
  return value.replace(/\s+/g, " ");
}

export function normalizeTitle(title: string): string {
  return collapseSpaces(title).trim();
}

// --------------------------------------------------
// Exercise 4:
// File: src/permissions/course-permissions.ts
//
// Course permission map oluştur.
// Permission type'ını keyof typeof ile üret.
// Risk level mapping'i Record ile type-safe yap.
// --------------------------------------------------

export const COURSE_PERMISSION_DESCRIPTIONS = {
  "courses:read": "Can view courses",
  "courses:create": "Can create courses",
  "courses:update": "Can update courses",
  "courses:delete": "Can delete courses",
} as const;

export type CoursePermission = keyof typeof COURSE_PERMISSION_DESCRIPTIONS;

export type PermissionRiskLevel = "low" | "medium" | "high";

export const COURSE_PERMISSION_RISK_LEVELS: Record<
  CoursePermission,
  PermissionRiskLevel
> = {
  "courses:read": "low",
  "courses:create": "medium",
  "courses:update": "medium",
  "courses:delete": "high",
};

export function getCoursePermissionDescription(
  permission: CoursePermission
): string {
  return COURSE_PERMISSION_DESCRIPTIONS[permission];
}

// --------------------------------------------------
// Exercise 5:
// File: src/index.ts
//
// Gerçek projede public API şu şekilde re-export edilebilir.
// Burada yorum olarak bırakıyoruz çünkü tek dosya içinde çalışıyoruz.
// --------------------------------------------------

// export type {
//   Course,
//   CourseStatus,
//   PublicCourse,
//   CreateCourseRequest,
//   UpdateCourseRequest,
// } from "./models/course";
//
// export {
//   COURSE_STATUSES,
//   createCourse,
// } from "./models/course";
//
// export type {
//   ApiResponse,
//   ApiError,
//   ApiResult,
// } from "./types/api";
//
// export {
//   normalizeTitle,
// } from "./utils/text";
//
// export type {
//   CoursePermission,
//   PermissionRiskLevel,
// } from "./permissions/course-permissions";
//
// export {
//   COURSE_PERMISSION_DESCRIPTIONS,
//   COURSE_PERMISSION_RISK_LEVELS,
//   getCoursePermissionDescription,
// } from "./permissions/course-permissions";

// --------------------------------------------------
// Exercise 6:
// Example usage
//
// Yukarıdaki export edilen yapıların gerçek kullanımını göster.
// --------------------------------------------------

const course = createCourse({
  title: normalizeTitle("   TypeScript    Core Track   "),
  description: "Learn practical TypeScript foundations.",
});

console.log(course.title);
// Expected output: "TypeScript Core Track"

const publicCourse: PublicCourse = {
  id: course.id,
  title: course.title,
  status: course.status,
};

console.log(publicCourse);
// Expected output:
// { id: "c1", title: "TypeScript Core Track", status: "draft" }

const courseResponse: ApiResponse<Course> = {
  success: true,
  data: course,
  requestId: "req-123",
};

console.log(courseResponse.data.status);
// Expected output: "draft"

const courseResult: ApiResult<PublicCourse> = {
  success: true,
  data: publicCourse,
  requestId: "req-456",
};

if (courseResult.success) {
  console.log(courseResult.data.title);
}
// Expected output: "TypeScript Core Track"

const permission: CoursePermission = "courses:update";

console.log(getCoursePermissionDescription(permission));
// Expected output: "Can update courses"

console.log(COURSE_PERMISSION_RISK_LEVELS["courses:delete"]);
// Expected output: "high"

// Bu compile olmamalı:
//
// const invalidStatus: CourseStatus = "deleted";
//
// const invalidPermission: CoursePermission = "courses:publish";
//
// COURSE_PERMISSION_RISK_LEVELS["courses:delete"] = "critical";

// --------------------------------------------------
// Exercise 7:
// Aşağıdaki import örneklerini gerçek çok dosyalı projede nasıl yazacağını incele.
// Bunlar burada comment olarak durmalı.
// --------------------------------------------------

// import type {
//   Course,
//   CreateCourseRequest,
//   PublicCourse,
// } from "./models/course";
//
// import {
//   COURSE_STATUSES,
//   createCourse,
// } from "./models/course";
//
// import type {
//   ApiResponse,
//   ApiResult,
// } from "./types/api";
//
// import {
//   normalizeTitle,
// } from "./utils/text";
//
// import type {
//   CoursePermission,
// } from "./permissions/course-permissions";
//
// import {
//   COURSE_PERMISSION_RISK_LEVELS,
//   getCoursePermissionDescription,
// } from "./permissions/course-permissions";