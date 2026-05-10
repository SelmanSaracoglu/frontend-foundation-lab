// 24-tsconfig-and-strictness-basics/exercises.ts

// --------------------------------------------------
// Exercise 1:
// noImplicitAny için güvenli bir normalizePermission fonksiyonu yaz.
// permission parametresi string olmalı.
// trim + lowercase dönmeli.
// --------------------------------------------------

function normalizePermission(permission: string): string {
  return permission.trim().toLowerCase();
}

console.log(normalizePermission(" USERS:READ "));
// Expected output: "users:read"

// Bu tarz fonksiyon noImplicitAny açıkken compile olmamalı:
//
// function normalizePermissionBad(permission) {
//   return permission.trim().toLowerCase();
// }

// --------------------------------------------------
// Exercise 2:
// User type'ı oluştur.
// findUserByEmail fonksiyonu User | undefined dönmeli.
// strictNullChecks'e uygun şekilde kullan.
// --------------------------------------------------

type User = {
  id: string;
  email: string;
  isActive: boolean;
};

const users: User[] = [
  {
    id: "u1",
    email: "ada@example.com",
    isActive: true,
  },
  {
    id: "u2",
    email: "disabled@example.com",
    isActive: false,
  },
];

function findUserByEmail(users: User[], email: string): User | undefined {
  const normalizedEmail = email.trim().toLowerCase();

  return users.find((user) => user.email === normalizedEmail);
}

const foundUser = findUserByEmail(users, " ADA@example.com ");

if (foundUser !== undefined) {
  console.log(foundUser.id);
}
// Expected output: "u1"

const missingUser = findUserByEmail(users, "missing@example.com");

if (missingUser === undefined) {
  console.log("User not found");
}
// Expected output: "User not found"

// Bu compile olmamalı:
//
// console.log(missingUser.email);

// --------------------------------------------------
// Exercise 3:
// getFirst<T> generic function yaz.
// Array boş olabileceği için T | undefined dönmeli.
// --------------------------------------------------

function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

const firstUser = getFirst(users);

if (firstUser !== undefined) {
  console.log(firstUser.email);
}
// Expected output: "ada@example.com"

const firstNumber = getFirst<number>([]);

if (firstNumber === undefined) {
  console.log("No number found");
}
// Expected output: "No number found"

// --------------------------------------------------
// Exercise 4:
// Record lookup güvenli kullan.
// usersById Record<string, User> oluştur.
// getUserByIdResult fonksiyonu ApiResult<User> dönsün.
// --------------------------------------------------

type ApiResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

const usersById: Record<string, User> = {
  u1: {
    id: "u1",
    email: "ada@example.com",
    isActive: true,
  },
};

function getUserByIdResult(id: string): ApiResult<User> {
  const user = usersById[id];

  if (user === undefined) {
    return {
      success: false,
      error: "User not found",
    };
  }

  return {
    success: true,
    data: user,
  };
}

const userResult = getUserByIdResult("missing");

if (userResult.success) {
  console.log(userResult.data.email);
} else {
  console.log(userResult.error);
}
// Expected output: "User not found"

// --------------------------------------------------
// Exercise 5:
// UpdateUserRequest type'ı oluştur.
// email ve name optional olsun.
// exactOptionalPropertyTypes davranışını comment ile açıkla.
// --------------------------------------------------

type UpdateUserRequest = {
  email?: string;
  name?: string;
};

const updateUserEmail: UpdateUserRequest = {
  email: "new@example.com",
};

const updateUserNothing: UpdateUserRequest = {};

console.log(updateUserEmail);
console.log(updateUserNothing);
// Expected output:
// { email: "new@example.com" }
// {}

/*
exactOptionalPropertyTypes açıkken:

email?: string şu anlama gelir:
- email property hiç gönderilmeyebilir.
- ama email: undefined açıkça verilmek isteniyorsa,
  type email?: string | undefined şeklinde yazılmalıdır.

Bu özellikle PATCH/update payload modellerinde önemlidir.
*/

// --------------------------------------------------
// Exercise 6:
// Eğer undefined değerini bilinçli olarak property value yapmak istiyorsan
// bunu type içinde açıkça belirt.
// --------------------------------------------------

type FormDraft = {
  email?: string | undefined;
  name?: string | undefined;
};

const draft: FormDraft = {
  email: undefined,
};

console.log(draft);
// Expected output:
// { email: undefined }

// --------------------------------------------------
// Exercise 7:
// noUncheckedIndexedAccess mantığı için array index erişimini güvenli yap.
// --------------------------------------------------

const auditActions = ["login_success", "users:read", "users:delete"];

const firstAction = auditActions[0];

if (firstAction !== undefined) {
  console.log(firstAction.toUpperCase());
}
// Expected output: "LOGIN_SUCCESS"

const missingAction = auditActions[99];

if (missingAction === undefined) {
  console.log("No action at this index");
}
// Expected output: "No action at this index"

// --------------------------------------------------
// Exercise 8:
// TypeScript hatasını assertion ile susturmak yerine güvenli branch kullan.
// --------------------------------------------------

function getRequiredUserEmail(id: string): ApiResult<string> {
  const user = usersById[id];

  if (user === undefined) {
    return {
      success: false,
      error: "Cannot get email because user was not found",
    };
  }

  return {
    success: true,
    data: user.email,
  };
}

const emailResult = getRequiredUserEmail("u2");

if (emailResult.success) {
  console.log(emailResult.data);
} else {
  console.log(emailResult.error);
}
// Expected output:
// "Cannot get email because user was not found"

// Kötü refleks:
//
// const user = usersById["u2"] as User;
// console.log(user.email);
//
// Bu compile olabilir ama runtime'da güvenli değildir.

// --------------------------------------------------
// Exercise 9:
// Önerilen strict compiler options object'ini yaz.
// --------------------------------------------------

const recommendedCompilerOptions = {
  strict: true,
  noUncheckedIndexedAccess: true,
  exactOptionalPropertyTypes: true,
};

console.log(recommendedCompilerOptions);
// Expected output:
// {
//   strict: true,
//   noUncheckedIndexedAccess: true,
//   exactOptionalPropertyTypes: true
// }

// --------------------------------------------------
// Exercise 10:
// Aşağıdaki ayarları kendi cümlelerinle açıkla.
// --------------------------------------------------

/*
strict:
TypeScript'in sıkı type checking ayarlarını açar.
Daha fazla potansiyel bug'ı compile-time'da yakalamaya yardım eder.

noImplicitAny:
TypeScript'in otomatik olarak any varsaymasını engeller.
Parametre ve değişkenlerde type bilgisini net yazmaya zorlar.

strictNullChecks:
null ve undefined ihtimallerini ciddi şekilde modelletir.
Özellikle find, optional data ve API response işlemlerinde önemlidir.

noUncheckedIndexedAccess:
Array veya Record index erişimlerinde undefined ihtimalini hesaba katar.
Boş array veya eksik key hatalarını daha erken yakalamaya yardım eder.

exactOptionalPropertyTypes:
Optional property'nin "gönderilmeyebilir" anlamını daha net yapar.
email?: string ile email: undefined aynı şey gibi davranmasın diye faydalıdır.
*/