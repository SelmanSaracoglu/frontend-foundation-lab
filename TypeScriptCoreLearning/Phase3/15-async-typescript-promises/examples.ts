// 15-async-typescript-promises/examples.ts

// -----------------------------------------------------
// 1. Basic async function
// -----------------------------------------------------

type User = {
  id: number;
  email: string;
};

async function getUser(): Promise<User> {
  return {
    id: 1,
    email: "admin@example.com",
  };
}

async function printUser(): Promise<void> {
  const user = await getUser();
  console.log(user.email);
}

printUser();


// -----------------------------------------------------
// 2. Async function with throw
// -----------------------------------------------------

async function getUserOrThrow(id: number): Promise<User> {
  if (id <= 0) {
    throw new Error("Invalid user id");
  }

  return {
    id,
    email: "user@example.com",
  };
}

async function runThrowExample(): Promise<void> {
  try {
    const user = await getUserOrThrow(0);
    console.log(user.email);
  } catch {
    console.log("Failed to get user");
  }
}

runThrowExample();


// -----------------------------------------------------
// 3. Async Result model
// -----------------------------------------------------

type AppError = {
  code: "INVALID_INPUT" | "USER_NOT_FOUND" | "UNAUTHORIZED";
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

async function findUserById(id: number): Promise<Result<User>> {
  if (id <= 0) {
    return {
      success: false,
      error: {
        code: "INVALID_INPUT",
        message: "User id must be positive",
      },
    };
  }

  if (id !== 1) {
    return {
      success: false,
      error: {
        code: "USER_NOT_FOUND",
        message: "User not found",
      },
    };
  }

  return {
    success: true,
    data: {
      id: 1,
      email: "admin@example.com",
    },
  };
}

async function runResultExample(): Promise<void> {
  const result = await findUserById(2);

  if (result.success) {
    console.log(result.data.email);
  } else {
    console.log(result.error.code);
    console.log(result.error.message);
  }
}

runResultExample();


// -----------------------------------------------------
// 4. Async auth-like example
// -----------------------------------------------------

type Session = {
  token: string;
  userId: number;
};

type LoginError = {
  code: "INVALID_CREDENTIALS" | "ACCOUNT_LOCKED";
  message: string;
};

type LoginResult =
  | {
      success: true;
      data: Session;
    }
  | {
      success: false;
      error: LoginError;
    };

async function login(email: string, password: string): Promise<LoginResult> {
  if (email !== "admin@example.com" || password !== "correct-password") {
    return {
      success: false,
      error: {
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
      },
    };
  }

  return {
    success: true,
    data: {
      token: "secure-token",
      userId: 1,
    },
  };
}

async function runLoginExample(): Promise<void> {
  const result = await login("admin@example.com", "wrong-password");

  if (result.success) {
    console.log(result.data.token);
  } else {
    console.log(result.error.message);
  }
}

runLoginExample();


// -----------------------------------------------------
// 5. Promise<void>
// -----------------------------------------------------

async function writeAuditLog(action: string): Promise<void> {
  console.log(`Audit log written: ${action}`);
}

writeAuditLog("USER_LOGIN_FAILED");