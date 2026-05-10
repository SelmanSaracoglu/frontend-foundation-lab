// 05-array-methods/examples.ts

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

// Example 1: forEach

users.forEach(function (user): void {
  console.log(`${user.email} has role ${user.role}`);
});

// Expected output:
// admin@example.com has role admin
// manager@example.com has role manager
// disabled@example.com has role user

// --------------------------------------------------

// Example 2: map

const userEmails = users.map(function (user): string {
  return user.email;
});

console.log(userEmails);

// Expected output:
// [ 'admin@example.com', 'manager@example.com', 'disabled@example.com' ]

// --------------------------------------------------

// Example 3: map objects to labels

const userLabels = users.map(function (user): string {
  return `${user.email} (${user.role})`;
});

console.log(userLabels);

// Expected output:
// [
//   'admin@example.com (admin)',
//   'manager@example.com (manager)',
//   'disabled@example.com (user)'
// ]

// --------------------------------------------------

// Example 4: filter

const activeUsers = users.filter(function (user): boolean {
  return user.isActive;
});

console.log(activeUsers);

// Expected behavior:
// returns only users where isActive is true

// --------------------------------------------------

// Example 5: filter failed login risk users

const riskyUsers = users.filter(function (user): boolean {
  return user.failedLoginAttempts >= 3;
});

console.log(riskyUsers);

// Expected behavior:
// returns disabled@example.com because failedLoginAttempts is 5

// --------------------------------------------------

// Example 6: find

const adminUser = users.find(function (user) {
  return user.role === "admin";
});

if (adminUser === undefined) {
  console.log("Admin user not found");
} else {
  console.log(adminUser.email);
}

// Expected output:
// admin@example.com

// --------------------------------------------------

// Example 7: some

const hasDisabledUser = users.some(function (user): boolean {
  return user.isActive === false;
});

console.log(hasDisabledUser);

// Expected output:
// true

// --------------------------------------------------

// Example 8: every

const allUsersActive = users.every(function (user): boolean {
  return user.isActive;
});

console.log(allUsersActive);

// Expected output:
// false

// --------------------------------------------------

// Example 9: includes

const userPermissions: string[] = ["read:user", "update:user"];

const canReadUser = userPermissions.includes("read:user");
const canDeleteUser = userPermissions.includes("delete:user");

console.log(canReadUser);
console.log(canDeleteUser);

// Expected output:
// true
// false

// --------------------------------------------------

// Example 10: reduce number total

const orderItems: {
  name: string;
  price: number;
  quantity: number;
}[] = [
  { name: "Keyboard", price: 100, quantity: 1 },
  { name: "Mouse", price: 50, quantity: 2 },
  { name: "Monitor", price: 300, quantity: 1 },
];

const orderTotal = orderItems.reduce(function (
  total: number,
  item
): number {
  return total + item.price * item.quantity;
},
0);

console.log(orderTotal);

// Expected output:
// 500

// --------------------------------------------------

// Example 11: reduce failed audit logs count

const auditLogs: {
  action: string;
  actorEmail: string;
  success: boolean;
}[] = [
  { action: "LOGIN", actorEmail: "admin@example.com", success: true },
  { action: "DELETE_USER", actorEmail: "admin@example.com", success: false },
  { action: "LOGIN", actorEmail: "user@example.com", success: false },
];

const failedLogCount = auditLogs.reduce(function (
  count: number,
  log
): number {
  if (log.success === false) {
    return count + 1;
  }

  return count;
},
0);

console.log(failedLogCount);

// Expected output:
// 2

// --------------------------------------------------

// Example 12: combining filter and map

const activeUserEmails = users
  .filter(function (user): boolean {
    return user.isActive;
  })
  .map(function (user): string {
    return user.email;
  });

console.log(activeUserEmails);

// Expected output:
// [ 'admin@example.com', 'manager@example.com' ]