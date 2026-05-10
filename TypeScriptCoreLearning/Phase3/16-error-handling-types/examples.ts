// 14-error-handling-types/examples.ts

// -----------------------------------------------------
// 1. Throwing error
// -----------------------------------------------------

type User = {
  id: number;
  email: string;
};

function getUserEmailOrThrow(user: User | null): string {
  if (user === null) {
    throw new Error("User not found");
  }

  return user.email;
}

try {
  const email = getUserEmailOrThrow({
    id: 1,
    email: "admin@example.com",
  });

  console.log(email);
} catch (error) {
  console.log("Something went wrong");
}


// -----------------------------------------------------
// 2. Basic Result type
// -----------------------------------------------------

type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

function findUserEmail(user: User | null): Result<string> {
  if (user === null) {
    return {
      success: false,
      error: "User not found",
    };
  }

  return {
    success: true,
    data: user.email,
  };
}

const emailResult = findUserEmail(null);

if (emailResult.success) {
  console.log(emailResult.data);
} else {
  console.log(emailResult.error);
}


// -----------------------------------------------------
// 3. AppError ile daha kontrollü hata modeli
// -----------------------------------------------------

type AppError = {
  code: "USER_NOT_FOUND" | "INVALID_INPUT" | "UNAUTHORIZED";
  message: string;
};

type AppResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: AppError;
    };

function findUserById(id: number): AppResult<User> {
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

const userResult = findUserById(2);

if (userResult.success) {
  console.log(userResult.data.email);
} else {
  console.log(userResult.error.code);
  console.log(userResult.error.message);
}


// -----------------------------------------------------
// 4. Login örneği: güvenli hata mesajı
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

function login(email: string, password: string): LoginResult {
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

const loginResult = login("admin@example.com", "wrong-password");

if (loginResult.success) {
  console.log(loginResult.data.token);
} else {
  console.log(loginResult.error.message);
}