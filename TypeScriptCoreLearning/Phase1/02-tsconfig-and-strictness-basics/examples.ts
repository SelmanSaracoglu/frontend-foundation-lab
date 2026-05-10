// 24-tsconfig-and-strictness-basics/examples.ts

// NOTE:
// Bu dosyadaki bazı örneklerin davranışı tsconfig ayarlarına bağlıdır.
// Özellikle:
// - strict
// - noImplicitAny
// - strictNullChecks
// - noUncheckedIndexedAccess
// - exactOptionalPropertyTypes

// --------------------------------------------------
// Example 1: noImplicitAny
// --------------------------------------------------

// With noImplicitAny enabled, this would not compile:
//
// function normalizeEmailBad(email) {
//   return email.trim().toLowerCase();
// }

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

console.log(normalizeEmail(" ADA@example.com "));
// Expected output: "ada@example.com"

// --------------------------------------------------
// Example 2: strictNullChecks with find
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
];

function findUserById(users: User[], id: string): User | undefined {
  return users.find((user) => user.id === id);
}

const foundUser = findUserById(users, "u1");

if (foundUser !== undefined) {
  console.log(foundUser.email);
}
// Expected output: "ada@example.com"

const missingUser = findUserById(users, "missing");

if (missingUser === undefined) {
  console.log("User not found");
}
// Expected output: "User not found"

// This would not compile safely with strictNullChecks:
//
// console.log(missingUser.email);

// --------------------------------------------------
// Example 3: noUncheckedIndexedAccess with arrays
// --------------------------------------------------

const emails: string[] = ["ada@example.com", "linus@example.com"];

const firstEmail = emails[0];

if (firstEmail !== undefined) {
  console.log(firstEmail.toUpperCase());
}
// Expected output: "ADA@EXAMPLE.COM"

const emptyEmails: string[] = [];

const missingEmail = emptyEmails[0];

if (missingEmail === undefined) {
  console.log("No email found");
}
// Expected output: "No email found"

// --------------------------------------------------
// Example 4: safer getFirst generic
// --------------------------------------------------

function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

const firstUser = getFirst(users);

if (firstUser !== undefined) {
  console.log(firstUser.id);
}
// Expected output: "u1"

// --------------------------------------------------
// Example 5: Record lookup with possible undefined
// --------------------------------------------------

const usersById: Record<string, User> = {
  u1: {
    id: "u1",
    email: "ada@example.com",
    isActive: true,
  },
};

const userFromMap = usersById["u1"];

if (userFromMap !== undefined) {
  console.log(userFromMap.email);
}
// Expected output: "ada@example.com"

const missingUserFromMap = usersById["u2"];

if (missingUserFromMap === undefined) {
  console.log("User does not exist in map");
}
// Expected output: "User does not exist in map"

// --------------------------------------------------
// Example 6: exactOptionalPropertyTypes
// --------------------------------------------------

type UpdateUserRequest = {
  email?: string;
  name?: string;
};

const updateEmail: UpdateUserRequest = {
  email: "new@example.com",
};

const updateNothing: UpdateUserRequest = {};

console.log(updateEmail);
console.log(updateNothing);
// Expected output:
// { email: "new@example.com" }
// {}

// With exactOptionalPropertyTypes enabled,
// this may not be accepted unless email?: string | undefined:
//
// const ambiguousUpdate: UpdateUserRequest = {
//   email: undefined,
// };

// --------------------------------------------------
// Example 7: explicit undefined when intended
// --------------------------------------------------

type FormDraft = {
  email?: string | undefined;
};

const formDraft: FormDraft = {
  email: undefined,
};

console.log(formDraft);
// Expected output:
// { email: undefined }

// Here undefined is intentionally part of the property type.

// --------------------------------------------------
// Example 8: avoid unsafe assertion
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

function getUserResult(id: string): ApiResult<User> {
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

const result = getUserResult("missing");

if (result.success) {
  console.log(result.data.email);
} else {
  console.log(result.error);
}
// Expected output: "User not found"

// Bad habit:
//
// const user = usersById["missing"] as User;
//
// This silences TypeScript but does not make the user exist.

// --------------------------------------------------
// Example 9: strict config as documentation
// --------------------------------------------------

const recommendedCompilerOptions = {
  strict: true,
  noUncheckedIndexedAccess: true,
  exactOptionalPropertyTypes: true,
};

console.log(recommendedCompilerOptions.strict);
// Expected output: true