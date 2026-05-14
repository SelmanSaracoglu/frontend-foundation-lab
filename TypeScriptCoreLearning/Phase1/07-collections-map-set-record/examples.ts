// 06-collections-map-set-record/examples.ts

// Example 1: Array as ordered list

const roles: string[] = ["admin", "manager", "user"];

console.log(roles[0]);
console.log(roles.length);

// Expected output:
// admin
// 3

// --------------------------------------------------

// Example 2: Set keeps unique values

const uniqueRoles = new Set<string>();

uniqueRoles.add("admin");
uniqueRoles.add("user");
uniqueRoles.add("admin");

console.log(uniqueRoles.has("admin"));
console.log(uniqueRoles.size);

// Expected output:
// true
// 2

// --------------------------------------------------

// Example 3: Remove duplicates with Set

const emails: string[] = [
  "admin@example.com",
  "user@example.com",
  "admin@example.com",
  "manager@example.com",
];

const uniqueEmails = Array.from(new Set<string>(emails));

console.log(uniqueEmails);

// Expected output:
// [ 'admin@example.com', 'user@example.com', 'manager@example.com' ]

// --------------------------------------------------

// Example 4: Set for permission checks

const userPermissions = new Set<string>([
  "read:user",
  "update:user",
  "read:audit-log",
]);

function hasPermission(permission: string): boolean {
  return userPermissions.has(permission);
}

console.log(hasPermission("read:user"));
console.log(hasPermission("delete:user"));

// Expected output:
// true
// false

// --------------------------------------------------

// Example 5: Map for user lookup by id

const usersById = new Map<
  string,
  {
    id: string;
    email: string;
    role: string;
  }
>();

usersById.set("user-1", {
  id: "user-1",
  email: "admin@example.com",
  role: "admin",
});

usersById.set("user-2", {
  id: "user-2",
  email: "user@example.com",
  role: "user",
});

const foundUser = usersById.get("user-1");

if (foundUser === undefined) {
  console.log("User not found");
} else {
  console.log(foundUser.email);
}

// Expected output:
// admin@example.com

// --------------------------------------------------

// Example 6: Map.get can return undefined

const missingUser = usersById.get("user-999");

if (missingUser === undefined) {
  console.log("Missing user");
} else {
  console.log(missingUser.email);
}

// Expected output:
// Missing user

// --------------------------------------------------

// Example 7: Iterate over Map

for (const [id, user] of usersById) {
  console.log(`${id}: ${user.email}`);
}

// Expected output:
// user-1: admin@example.com
// user-2: user@example.com

// --------------------------------------------------

// Example 8: Record for role labels

const roleLabels: Record<"admin" | "manager" | "user", string> = {
  admin: "Administrator",
  manager: "Manager",
  user: "User",
};

console.log(roleLabels.admin);
console.log(roleLabels["manager"]);

// Expected output:
// Administrator
// Manager

// --------------------------------------------------

// Example 9: Record for permission descriptions

const permissionDescriptions: Record<string, string> = {
  "read:user": "Can read user profiles",
  "update:user": "Can update user profiles",
  "delete:user": "Can delete users",
};

console.log(permissionDescriptions["delete:user"]);

// Expected output:
// Can delete users

// --------------------------------------------------

// Example 10: Record with object values

const permissionMetadata: Record<
  string,
  {
    description: string;
    isSensitive: boolean;
  }
> = {
  "read:user": {
    description: "Can read user profiles",
    isSensitive: false,
  },
  "delete:user": {
    description: "Can delete users",
    isSensitive: true,
  },
  "read:audit-log": {
    description: "Can read audit logs",
    isSensitive: true,
  },
};

console.log(permissionMetadata["delete:user"]?.isSensitive);

// Expected output:
// true

// --------------------------------------------------

// Example 11: Create Map from array

const users: {
  id: string;
  email: string;
  role: string;
}[] = [
  {
    id: "user-1",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "user-2",
    email: "manager@example.com",
    role: "manager",
  },
];

const userLookup = new Map<
  string,
  {
    id: string;
    email: string;
    role: string;
  }
>();

for (const user of users) {
  userLookup.set(user.id, user);
}

const manager = userLookup.get("user-2");

if (manager !== undefined) {
  console.log(manager.email);
}

// Expected output:
// manager@example.com

// --------------------------------------------------

// Example 12: Sensitive permissions with Set

const sensitivePermissions = new Set<string>([
  "delete:user",
  "manage:roles",
  "read:audit-log",
]);

function isSensitivePermission(permission: string): boolean {
  return sensitivePermissions.has(permission);
}

console.log(isSensitivePermission("delete:user"));
console.log(isSensitivePermission("read:user"));

// Expected output:
// true
// false
