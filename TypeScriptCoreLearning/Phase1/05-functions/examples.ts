// 04-functions/examples.ts

// Example 1: parameter types and return type

function createWelcomeMessage(email: string): string {
  return `Welcome, ${email}`;
}

console.log(createWelcomeMessage("admin@example.com"));

// Expected output:
// Welcome, admin@example.com

// This would be a TypeScript error:
// createWelcomeMessage(123);

// --------------------------------------------------

// Example 2: calculation function

function calculateOrderTotal(price: number, quantity: number): number {
  return price * quantity;
}

console.log(calculateOrderTotal(25, 4));

// Expected output:
// 100

// --------------------------------------------------

// Example 3: void function

function logAuditEvent(action: string, actorEmail: string): void {
  console.log(`${actorEmail} performed ${action}`);
}

logAuditEvent("LOGIN", "admin@example.com");

// Expected output:
// admin@example.com performed LOGIN

// --------------------------------------------------

// Example 4: object parameter

function printUserStatus(user: { email: string; isActive: boolean }): void {
  if (user.isActive) {
    console.log(`${user.email} is active`);
    return;
  }

  console.log(`${user.email} is inactive`);
}

printUserStatus({
  email: "admin@example.com",
  isActive: true,
});

printUserStatus({
  email: "disabled@example.com",
  isActive: false,
});

// Expected output:
// admin@example.com is active
// disabled@example.com is inactive

// --------------------------------------------------

// Example 5: object return type

function createUser(email: string): {
  email: string;
  isActive: boolean;
  role: string;
} {
  return {
    email,
    isActive: true,
    role: "user",
  };
}

const newUser = createUser("new-user@example.com");

console.log(newUser);

// Expected output:
// {
//   email: 'new-user@example.com',
//   isActive: true,
//   role: 'user'
// }

// --------------------------------------------------

// Example 6: optional parameter

function createAuditMessage(action: string, actorEmail?: string): string {
  if (actorEmail === undefined) {
    return `System performed ${action}`;
  }

  return `${actorEmail} performed ${action}`;
}

console.log(createAuditMessage("SYSTEM_BACKUP"));
console.log(createAuditMessage("DELETE_USER", "admin@example.com"));

// Expected output:
// System performed SYSTEM_BACKUP
// admin@example.com performed DELETE_USER

// --------------------------------------------------

// Example 7: default parameter

function createPageUrl(page: number = 1): string {
  return `/courses?page=${page}`;
}

console.log(createPageUrl());
console.log(createPageUrl(3));

// Expected output:
// /courses?page=1
// /courses?page=3

// --------------------------------------------------

// Example 8: function type annotation

const canLogin: (isActive: boolean, failedAttempts: number) => boolean = (
  isActive,
  failedAttempts
) => {
  return isActive && failedAttempts < 5;
};

console.log(canLogin(true, 2));
console.log(canLogin(true, 5));
console.log(canLogin(false, 1));

// Expected output:
// true
// false
// false

// --------------------------------------------------

// Example 9: callback function type

function processUserEmail(
  email: string,
  formatter: (email: string) => string
): string {
  return formatter(email);
}

const normalizedEmail = processUserEmail(
  " ADMIN@EXAMPLE.COM ",
  function (email: string): string {
    return email.trim().toLowerCase();
  }
);

console.log(normalizedEmail);

// Expected output:
// admin@example.com

// --------------------------------------------------

// Example 10: permission check

function hasPermission(
  userPermissions: string[],
  requiredPermission: string
): boolean {
  return userPermissions.includes(requiredPermission);
}

const permissions = ["read:user", "update:user"];

console.log(hasPermission(permissions, "read:user"));
console.log(hasPermission(permissions, "delete:user"));

// Expected output:
// true
// false

// --------------------------------------------------

// Example 11: function with object array

function countActiveUsers(
  users: { email: string; isActive: boolean }[]
): number {
  let count = 0;

  for (const user of users) {
    if (user.isActive) {
      count = count + 1;
    }
  }

  return count;
}

const users = [
  { email: "admin@example.com", isActive: true },
  { email: "disabled@example.com", isActive: false },
  { email: "user@example.com", isActive: true },
];

console.log(countActiveUsers(users));

// Expected output:
// 2