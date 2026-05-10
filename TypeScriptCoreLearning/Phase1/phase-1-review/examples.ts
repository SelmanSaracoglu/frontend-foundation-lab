// phase-1-review/examples.ts

const users: {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
  failedLoginAttempts: number;
}[] = [
  {
    id: "user-1",
    email: "admin@example.com",
    role: "admin",
    isActive: true,
    failedLoginAttempts: 0,
  },
  {
    id: "user-2",
    email: "manager@example.com",
    role: "manager",
    isActive: true,
    failedLoginAttempts: 1,
  },
  {
    id: "user-3",
    email: "disabled@example.com",
    role: "user",
    isActive: false,
    failedLoginAttempts: 5,
  },
];

function getActiveUserEmails(
  users: {
    id: string;
    email: string;
    role: string;
    isActive: boolean;
    failedLoginAttempts: number;
  }[]
): string[] {
  return users
    .filter(function (user): boolean {
      return user.isActive;
    })
    .map(function (user): string {
      return user.email;
    });
}

console.log(getActiveUserEmails(users));

// Expected output:
// [ 'admin@example.com', 'manager@example.com' ]

// --------------------------------------------------

function hasRiskyLoginAttempts(
  users: {
    email: string;
    failedLoginAttempts: number;
  }[]
): boolean {
  return users.some(function (user): boolean {
    return user.failedLoginAttempts >= 3;
  });
}

console.log(hasRiskyLoginAttempts(users));

// Expected output:
// true

// --------------------------------------------------

const permissionSet = new Set<string>([
  "read:user",
  "update:user",
  "read:audit-log",
]);

function hasPermission(requiredPermission: string): boolean {
  return permissionSet.has(requiredPermission);
}

console.log(hasPermission("read:user"));
console.log(hasPermission("delete:user"));

// Expected output:
// true
// false

// --------------------------------------------------

const roleLabels: Record<"admin" | "manager" | "user", string> = {
  admin: "Administrator",
  manager: "Manager",
  user: "User",
};

function getRoleLabel(role: "admin" | "manager" | "user"): string {
  return roleLabels[role];
}

console.log(getRoleLabel("admin"));
console.log(getRoleLabel("manager"));

// Expected output:
// Administrator
// Manager

// --------------------------------------------------

const sessionsByToken = new Map<
  string,
  {
    userId: string;
    expiresAt: string;
  }
>();

sessionsByToken.set("token-abc", {
  userId: "user-1",
  expiresAt: "2026-05-09T12:00:00Z",
});

function printSessionUserId(token: string): void {
  const session = sessionsByToken.get(token);

  if (session === undefined) {
    console.log("Session not found");
    return;
  }

  console.log(session.userId);
}

printSessionUserId("token-abc");
printSessionUserId("missing-token");

// Expected output:
// user-1
// Session not found