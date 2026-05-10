// 16-generics/examples.ts

// --------------------------------------------------
// Example 1: Generic function
// --------------------------------------------------

function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

const firstNumber = getFirst([10, 20, 30]);
console.log(firstNumber);
// Expected output: 10
// Type: number | undefined

const firstUserName = getFirst(["Ada", "Linus", "Grace"]);
console.log(firstUserName);
// Expected output: "Ada"
// Type: string | undefined

type User = {
  id: string;
  email: string;
  role: "admin" | "user";
};

const users: User[] = [
  { id: "u1", email: "ada@example.com", role: "admin" },
  { id: "u2", email: "linus@example.com", role: "user" },
];

const firstUser = getFirst(users);
console.log(firstUser);
// Expected output:
// { id: "u1", email: "ada@example.com", role: "admin" }
// Type: User | undefined

// --------------------------------------------------
// Example 2: Generic API response type
// --------------------------------------------------

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
};

const userResponse: ApiResponse<User> = {
  success: true,
  data: {
    id: "u1",
    email: "ada@example.com",
    role: "admin",
  },
};

const productResponse: ApiResponse<Product> = {
  success: true,
  data: {
    id: "p1",
    name: "Mechanical Keyboard",
    price: 120,
  },
};

console.log(userResponse.data.email);
// Expected output: "ada@example.com"

console.log(productResponse.data.price);
// Expected output: 120

// --------------------------------------------------
// Example 3: Generic paginated result
// --------------------------------------------------

type PaginatedResult<T> = {
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
};

const paginatedUsers: PaginatedResult<User> = {
  items: users,
  totalItems: 2,
  page: 1,
  pageSize: 10,
};

console.log(paginatedUsers.items[0]?.email);
// Expected output: "ada@example.com"

const paginatedProducts: PaginatedResult<Product> = {
  items: [
    { id: "p1", name: "Keyboard", price: 120 },
    { id: "p2", name: "Mouse", price: 60 },
  ],
  totalItems: 2,
  page: 1,
  pageSize: 10,
};

console.log(paginatedProducts.items[1]?.name);
// Expected output: "Mouse"

// --------------------------------------------------
// Example 4: Multiple generic parameters
// --------------------------------------------------

type ApiResult<TData, TError> =
  | {
      success: true;
      data: TData;
    }
  | {
      success: false;
      error: TError;
    };

type ValidationError = {
  field: string;
  message: string;
};

const successfulResult: ApiResult<User, ValidationError> = {
  success: true,
  data: {
    id: "u1",
    email: "ada@example.com",
    role: "admin",
  },
};

const failedResult: ApiResult<User, ValidationError> = {
  success: false,
  error: {
    field: "email",
    message: "Email is required",
  },
};

function printApiResult<TData, TError>(result: ApiResult<TData, TError>): void {
  if (result.success) {
    console.log("Success:", result.data);
  } else {
    console.log("Error:", result.error);
  }
}

printApiResult(successfulResult);
// Expected output:
// Success: { id: "u1", email: "ada@example.com", role: "admin" }

printApiResult(failedResult);
// Expected output:
// Error: { field: "email", message: "Email is required" }

// --------------------------------------------------
// Example 5: Generic constraint
// --------------------------------------------------

function getEntityId<T extends { id: string }>(entity: T): string {
  return entity.id;
}

const userId = getEntityId({
  id: "u1",
  email: "ada@example.com",
});

console.log(userId);
// Expected output: "u1"

const productId = getEntityId({
  id: "p1",
  name: "Keyboard",
  price: 120,
});

console.log(productId);
// Expected output: "p1"

// This would not compile because the object has no id:
//
// getEntityId({
//   message: "User logged in",
// });

// --------------------------------------------------
// Example 6: Generic default type
// --------------------------------------------------

type SecureApiResponse<T = unknown> = {
  success: boolean;
  data: T;
  requestId: string;
};

const unknownResponse: SecureApiResponse = {
  success: true,
  data: {
    raw: "some unknown server response",
  },
  requestId: "req-123",
};

console.log(unknownResponse.requestId);
// Expected output: "req-123"

const typedResponse: SecureApiResponse<User> = {
  success: true,
  data: {
    id: "u2",
    email: "linus@example.com",
    role: "user",
  },
  requestId: "req-456",
};

console.log(typedResponse.data.role);
// Expected output: "user"

// --------------------------------------------------
// Example 7: Generic helper for application data
// --------------------------------------------------

function mapById<T extends { id: string }>(items: T[]): Record<string, T> {
  const result: Record<string, T> = {};

  for (const item of items) {
    result[item.id] = item;
  }

  return result;
}

const usersById = mapById(users);

console.log(usersById.u1?.email);
// Expected output: "ada@example.com"

const productsById = mapById([
  { id: "p1", name: "Keyboard", price: 120 },
  { id: "p2", name: "Mouse", price: 60 },
]);

console.log(productsById.p2?.price);
// Expected output: 60