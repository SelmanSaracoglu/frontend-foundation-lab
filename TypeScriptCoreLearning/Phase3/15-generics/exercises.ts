// 16-generics/exercises.ts

// Exercise 1:
// Generic bir getLast fonksiyonu yaz.
// Array'in son elemanını dönmeli.
// Array boşsa undefined dönmeli.

function getLast<T>(items: T[]): T | undefined {
  // Burayı tamamla
  return items[items.length - 1];
}

const lastNumber = getLast([10, 20, 30]);
const lastName = getLast(["Ada", "Linus", "Grace"]);

console.log(lastNumber);
// Expected output: 30

console.log(lastName);
// Expected output: "Grace"

// --------------------------------------------------

// Exercise 2:
// Generic ApiResponse<T> type'ı oluştur.
// success: boolean
// data: T
// message?: string alanlarına sahip olsun.

type ApiResponse<T> = {
  // Burayı tamamla
  success: boolean;
  data: T;
  message?: string;
};

type Course = {
  id: string;
  title: string;
  isPublished: boolean;
};

const courseResponse: ApiResponse<Course> = {
  success: true,
  data: {
    id: "c1",
    title: "TypeScript Core",
    isPublished: true,
  },
};

console.log(courseResponse.data.title);
// Expected output: "TypeScript Core"

// --------------------------------------------------

// Exercise 3:
// PaginatedResult<T> type'ı oluştur.
// items: T[]
// totalItems: number
// page: number
// pageSize: number alanlarına sahip olsun.

type PaginatedResult<T> = {
  // Burayı tamamla
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
};

const coursePage: PaginatedResult<Course> = {
  items: [
    {
      id: "c1",
      title: "TypeScript Core",
      isPublished: true,
    },
    {
      id: "c2",
      title: "React with TypeScript",
      isPublished: false,
    },
  ],
  totalItems: 2,
  page: 1,
  pageSize: 10,
};

console.log(coursePage.items[0]?.title);
// Expected output: "TypeScript Core"

// --------------------------------------------------

// Exercise 4:
// getId adında generic bir fonksiyon yaz.
// Sadece id: string alanına sahip object'leri kabul etsin.
// id değerini string olarak dönsün.

function getId<T extends { id: string }>(item: T): string {
  // Burayı tamamla
  return item.id;
}

const courseId = getId({
  id: "c1",
  title: "TypeScript Core",
});

console.log(courseId);
// Expected output: "c1"

// Bu örnek compile olmamalı:
//
// getId({
//   title: "No ID here",
// });

// --------------------------------------------------

// Exercise 5:
// ApiResult<TData, TError> type'ı oluştur.
// Discriminated union olarak tasarla.
//
// Başarılı durumda:
// success: true
// data: TData
//
// Hatalı durumda:
// success: false
// error: TError

type ApiResult<TData, TError> =
  | {
      // Burayı tamamla
      success: true;
      data: TData;
    }
  | {
      // Burayı tamamla
      success: false;
      error: TError;
    };

type AuthError = {
  code: "INVALID_CREDENTIALS" | "LOCKED_ACCOUNT";
  message: string;
};

const loginResult: ApiResult<
  {
    userId: string;
    email: string;
  },
  AuthError
> =
  Math.random() > 0.5
    ? {
        success: true,
        data: {
          userId: "u1",
          email: "admin@example.com",
        },
      }
    : {
        success: false,
        error: {
          code: "INVALID_CREDENTIALS",
          message:
            "Email or password is incorrect",
        },
      };

if (loginResult.success) {
  console.log(loginResult.data.email);
} else {
  console.log(loginResult.error.message);
}

// Expected output:
// "Email or password is incorrect"

// --------------------------------------------------

// Exercise 6:
// mapById adında generic bir fonksiyon yaz.
// Sadece id: string alanı olan object array kabul etsin.
// Sonuç olarak Record<string, T> dönsün.
//
// Örnek:
// [
//   { id: "u1", email: "a@example.com" }
// ]
//
// Şuna dönüşmeli:
// {
//   u1: { id: "u1", email: "a@example.com" }
// }

function mapById<T extends { id: string }>(items: T[]): Record<string, T> {
  // Burayı tamamla
  const result: Record<string, T> = {};

  for (const item of items) {
    result[item.id] = item;
  }

  return result;
}

const coursesById = mapById([
  {
    id: "c1",
    title: "TypeScript Core",
    isPublished: true,
  },
  {
    id: "c2",
    title: "React with TypeScript",
    isPublished: false,
  },
]);

console.log(coursesById.c2?.isPublished);
// Expected output: false

// --------------------------------------------------

// Exercise 7:
// createSuccessResponse<T> adında generic bir fonksiyon yaz.
// data parametresi alsın.
// ApiResponse<T> dönsün.
// success her zaman true olsun.

function createSuccessResponse<T>(data: T): ApiResponse<T> {
  // Burayı tamamla
  return {
    success: true,
    data,
  };
}

const createdResponse = createSuccessResponse({
  id: "c3",
  title: "Secure API Testing",
  isPublished: false,
});

console.log(createdResponse.data.title);
// Expected output: "Secure API Testing"
