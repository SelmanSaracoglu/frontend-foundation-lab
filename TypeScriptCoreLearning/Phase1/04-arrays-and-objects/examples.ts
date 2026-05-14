// 03-arrays-and-objects/examples.ts

// Example 1: string array

const roles: string[] = ["admin", "manager", "user"];

roles.push("support");

console.log(roles);

// Expected output:
// [ 'admin', 'manager', 'user', 'support' ]

// This would be a TypeScript error:
// roles.push(123);

// --------------------------------------------------

// Example 2: number array

const failedLoginAttempts: number[] = [0, 1, 2, 3];

console.log(failedLoginAttempts);

// Expected output:
// [ 0, 1, 2, 3 ]

// --------------------------------------------------

// Example 3: object type annotation

const user: {
  id: string;
  email: string;
  isActive: boolean;
} = {
  id: "user-1",
  email: "admin@example.com",
  isActive: true,
};

console.log(user.email);
console.log(user.isActive);

// Expected output:
// admin@example.com
// true

// --------------------------------------------------

// Example 4: object array

const users: {
  id: string;
  email: string;
  isActive: boolean;
}[] = [
  {
    id: "user-1",
    email: "admin@example.com",
    isActive: true,
  },
  {
    id: "user-2",
    email: "disabled@example.com",
    isActive: false,
  },
];

console.log(users.length);
console.log(users[0]?.email);

// Expected output:
// 2
// admin@example.com

// --------------------------------------------------

// Example 5: optional property

const newUser: {
  id: string;
  email: string;
  lastLoginAt?: string;
} = {
  id: "user-3",
  email: "new-user@example.com",
};

const returningUser: {
  id: string;
  email: string;
  lastLoginAt?: string;
} = {
  id: "user-4",
  email: "returning-user@example.com",
  lastLoginAt: "2026-05-09T10:00:00Z",
};

console.log(newUser.lastLoginAt);
console.log(returningUser.lastLoginAt);

// Expected output:
// undefined
// 2026-05-09T10:00:00Z

// --------------------------------------------------

// Example 6: safely using optional property

function printLastLogin(user: { email: string; lastLoginAt?: string }): void {
  if (user.lastLoginAt === undefined) {
    console.log(`${user.email} has never logged in`);
    return;
  }

  console.log(`${user.email} last logged in at ${user.lastLoginAt}`);
}

printLastLogin(newUser);
printLastLogin(returningUser);

// Expected output:
// new-user@example.com has never logged in
// returning-user@example.com last logged in at 2026-05-09T10:00:00Z

// --------------------------------------------------

// Example 7: readonly property

const auditLog: {
  readonly id: string;
  action: string;
  actorEmail: string;
  success: boolean;
} = {
  id: "log-1",
  action: "LOGIN",
  actorEmail: "admin@example.com",
  success: true,
};

auditLog.success = false;

// This would be a TypeScript error:
// auditLog.id = "log-2";

console.log(auditLog);

// Expected output:
// {
//   id: 'log-1',
//   action: 'LOGIN',
//   actorEmail: 'admin@example.com',
//   success: false
// }

// --------------------------------------------------

// Example 8: nested object

const loginResponse: {
  token: string;
  expiresInSeconds: number;
  user: {
    id: string;
    email: string;
    role: string;
  };
} = {
  token: "jwt-token",
  expiresInSeconds: 3600,
  user: {
    id: "user-1",
    email: "admin@example.com",
    role: "admin",
  },
};

console.log(loginResponse.user.email);
console.log(loginResponse.expiresInSeconds);

// Expected output:
// admin@example.com
// 3600

// --------------------------------------------------

// Example 9: object array with security-related data

const permissions: {
  key: string;
  description: string;
  isSensitive: boolean;
}[] = [
  {
    key: "read:user",
    description: "Can read user profiles",
    isSensitive: false,
  },
  {
    key: "delete:user",
    description: "Can delete users",
    isSensitive: true,
  },
];

console.log(permissions[1]?.key);
console.log(permissions[1]?.isSensitive);

// Expected output:
// delete:user
// true
