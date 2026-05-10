// phase-4-review/exercises.ts

// Goal:
// Phase 4 konularını bir Course domain modeli üzerinden tekrar et.

// --------------------------------------------------
// Exercise 1:
// Generic ApiResponse<T> ve ApiResult<TData, TError> type'larını oluştur.
// --------------------------------------------------

type ApiResponse<T> = {
  success: boolean;
  data: T;
  requestId: string;
};

type ApiError = {
  code: string;
  message: string;
};

type ApiResult<TData, TError = ApiError> =
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
// Exercise 2:
// COURSE_STATUSES array'inden CourseStatus type'ı üret.
// COURSE_LEVELS array'inden CourseLevel type'ı üret.
// --------------------------------------------------

const COURSE_STATUSES = ["draft", "published", "archived"] as const;

type CourseStatus = (typeof COURSE_STATUSES)[number];

const COURSE_LEVELS = ["beginner", "intermediate", "advanced"] as const;

type CourseLevel = (typeof COURSE_LEVELS)[number];

// --------------------------------------------------
// Exercise 3:
// Course domain modelini oluştur.
// --------------------------------------------------

type Course = {
  id: string;
  title: string;
  description: string;
  status: CourseStatus;
  level: CourseLevel;
  instructorId: string;
  studentCount: number;
  createdAt: string;
  updatedAt: string;
};

// --------------------------------------------------
// Exercise 4:
// Utility types kullanarak aşağıdaki type'ları oluştur.
//
// PublicCourse:
// id, title, status, level alanlarını içersin.
//
// CreateCourseRequest:
// title, description, level, instructorId alanlarını içersin.
//
// UpdateCourseRequest:
// title, description, status, level alanlarının partial hali olsun.
//
// CourseSortableField:
// title, status, level, studentCount alanlarının key union'ı olsun.
// --------------------------------------------------

type PublicCourse = Pick<Course, "id" | "title" | "status" | "level">;

type CreateCourseRequest = Pick<
  Course,
  "title" | "description" | "level" | "instructorId"
>;

type UpdateCourseRequest = Partial<
  Pick<Course, "title" | "description" | "status" | "level">
>;

type CourseSortableField = keyof Pick<
  Course,
  "title" | "status" | "level" | "studentCount"
>;

// --------------------------------------------------
// Exercise 5:
// CourseEditableValue type'ını oluştur.
// Course type'ından title, description, status ve level alanlarının
// value type'larını indexed access ile çıkar.
// --------------------------------------------------

type CourseEditableValue = Course["title" | "description" | "status" | "level"];

const editableTitle: CourseEditableValue = "TypeScript Core";
const editableStatus: CourseEditableValue = "published";

console.log(editableTitle);
console.log(editableStatus);
// Expected output:
// "TypeScript Core"
// "published"

// --------------------------------------------------
// Exercise 6:
// CourseStatus için label map oluştur.
// Record<CourseStatus, string> kullan.
// --------------------------------------------------

const courseStatusLabels: Record<CourseStatus, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
};

console.log(courseStatusLabels.published);
// Expected output: "Published"

// --------------------------------------------------
// Exercise 7:
// CourseLevel için zorluk açıklaması oluştur.
// Record<CourseLevel, string> kullan.
// --------------------------------------------------

const courseLevelDescriptions: Record<CourseLevel, string> = {
  beginner: "Good for new learners",
  intermediate: "Requires some foundation",
  advanced: "Requires strong prior knowledge",
};

console.log(courseLevelDescriptions.advanced);
// Expected output: "Requires strong prior knowledge"

// --------------------------------------------------
// Exercise 8:
// getValue generic helper'ını yaz.
// --------------------------------------------------

function getValue<T, K extends keyof T>(item: T, key: K): T[K] {
  return item[key];
}

// --------------------------------------------------
// Exercise 9:
// setValue generic helper'ını yaz.
// --------------------------------------------------

function setValue<T, K extends keyof T>(item: T, key: K, value: T[K]): T {
  return {
    ...item,
    [key]: value,
  };
}

// --------------------------------------------------
// Exercise 10:
// mapById generic helper'ını yaz.
// Sadece id: string alanı olan object array kabul etsin.
// --------------------------------------------------

function mapById<T extends { id: string }>(items: T[]): Record<string, T> {
  const result: Record<string, T> = {};

  for (const item of items) {
    result[item.id] = item;
  }

  return result;
}

// --------------------------------------------------
// Exercise 11:
// createCourse fonksiyonunu yaz.
// CreateCourseRequest alıp Course dönsün.
// status default "draft" olsun.
// studentCount default 0 olsun.
// --------------------------------------------------

function createCourse(request: CreateCourseRequest): Course {
  const now = new Date().toISOString();

  return {
    id: "course-1",
    title: request.title,
    description: request.description,
    status: "draft",
    level: request.level,
    instructorId: request.instructorId,
    studentCount: 0,
    createdAt: now,
    updatedAt: now,
  };
}

// --------------------------------------------------
// Exercise 12:
// updateCourse fonksiyonunu yaz.
// Course ve UpdateCourseRequest alıp yeni Course dönsün.
// updatedAt yenilensin.
// --------------------------------------------------

function updateCourse(course: Course, request: UpdateCourseRequest): Course {
  return {
    ...course,
    ...request,
    updatedAt: new Date().toISOString(),
  };
}

// --------------------------------------------------
// Exercise 13:
// toPublicCourse fonksiyonunu yaz.
// Course alıp PublicCourse dönsün.
// --------------------------------------------------

function toPublicCourse(course: Course): PublicCourse {
  return {
    id: course.id,
    title: course.title,
    status: course.status,
    level: course.level,
  };
}

// --------------------------------------------------
// Exercise 14:
// createSuccessResponse<T> generic function yaz.
// T alıp ApiResponse<T> dönsün.
// --------------------------------------------------

function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
    requestId: "req-123",
  };
}

// --------------------------------------------------
// Exercise 15:
// Yukarıdaki yapıları birlikte kullan.
// --------------------------------------------------

const course = createCourse({
  title: "TypeScript Core Track",
  description: "Build practical TypeScript foundations.",
  level: "beginner",
  instructorId: "u1",
});

console.log(course.status);
// Expected output: "draft"

const publishedCourse = updateCourse(course, {
  status: "published",
});

console.log(publishedCourse.status);
// Expected output: "published"

const publicCourse = toPublicCourse(publishedCourse);

console.log(publicCourse);
// Expected output:
// {
//   id: "course-1",
//   title: "TypeScript Core Track",
//   status: "published",
//   level: "beginner"
// }

const courseTitle = getValue(publishedCourse, "title");
const courseLevel = getValue(publishedCourse, "level");

console.log(courseTitle);
console.log(courseLevel);
// Expected output:
// "TypeScript Core Track"
// "beginner"

const advancedCourse = setValue(publishedCourse, "level", "advanced");

console.log(advancedCourse.level);
// Expected output: "advanced"

const coursesById = mapById([course, publishedCourse, advancedCourse]);

console.log(coursesById["course-1"]?.level);
// Expected output depends on last object with same id:
// "advanced"

const courseResponse = createSuccessResponse(publicCourse);

console.log(courseResponse.data.title);
// Expected output: "TypeScript Core Track"

const courseResult: ApiResult<PublicCourse> = {
  success: true,
  data: publicCourse,
  requestId: "req-456",
};

if (courseResult.success) {
  console.log(courseResult.data.status);
}
// Expected output: "published"

const sortableField: CourseSortableField = "studentCount";

console.log(sortableField);
// Expected output: "studentCount"

// These should not compile:
//
// const invalidStatus: CourseStatus = "deleted";
//
// const invalidLevel: CourseLevel = "expert";
//
// const invalidSortField: CourseSortableField = "createdAt";
//
// setValue(publishedCourse, "studentCount", "many");
//
// getValue(publishedCourse, "missingField");