// phase-3-review/examples.ts

type User = {
  id: number;
  email: string;
  role: "admin" | "user";
};

type AppError = {
  code: "INVALID_JSON" | "INVALID_USER_DATA" | "FORBIDDEN";
  message: string;
};

type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: AppError;
    };

function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "id" in value &&
    typeof value.id === "number" &&
    "email" in value &&
    typeof value.email === "string" &&
    "role" in value &&
    (value.role === "admin" || value.role === "user")
  );
}

async function parseUserJson(input: string): Promise<Result<User>> {
  try {
    const parsed: unknown = JSON.parse(input);

    if (!isUser(parsed)) {
      return {
        success: false,
        error: {
          code: "INVALID_USER_DATA",
          message: "Invalid user data",
        },
      };
    }

    return {
      success: true,
      data: parsed,
    };
  } catch {
    return {
      success: false,
      error: {
        code: "INVALID_JSON",
        message: "Invalid JSON input",
      },
    };
  }
}

async function requireAdmin(input: string): Promise<Result<User>> {
  const userResult = await parseUserJson(input);

  if (!userResult.success) {
    return userResult;
  }

  if (userResult.data.role !== "admin") {
    return {
      success: false,
      error: {
        code: "FORBIDDEN",
        message: "You are not allowed to perform this action",
      },
    };
  }

  return {
    success: true,
    data: userResult.data,
  };
}

async function runExample(): Promise<void> {
  const input = '{"id":1,"email":"admin@example.com","role":"admin"}';

  const result = await requireAdmin(input);

  if (result.success) {
    console.log(`Access granted for ${result.data.email}`);
  } else {
    console.log(result.error.code);
    console.log(result.error.message);
  }
}

runExample();