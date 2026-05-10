// 23-satisfies-as-const-type-assertions/exercises.ts

// --------------------------------------------------
// Exercise 1:
// PRODUCT_STATUSES array'i oluştur.
// Değerler: "draft", "active", "archived"
// as const kullan.
// ProductStatus type'ını array'den üret.
// --------------------------------------------------

const PRODUCT_STATUSES = ["draft", "active", "archived"] as const;

type ProductStatus = (typeof PRODUCT_STATUSES)[number];

const productStatus: ProductStatus = "active";

console.log(productStatus);
// Expected output: "active"

// Bu compile olmamalı:
//
// const invalidProductStatus: ProductStatus = "deleted";

// --------------------------------------------------
// Exercise 2:
// USER_ROLE object'i oluştur.
// Admin -> "admin"
// User -> "user"
// Support -> "support"
// as const kullan.
// UserRole type'ını object value'larından üret.
// --------------------------------------------------

const USER_ROLE = {
  Admin: "admin",
  User: "user",
  Support: "support",
} as const;

type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

const userRole: UserRole = "support";

console.log(userRole);
// Expected output: "support"

// Bu compile olmamalı:
//
// const invalidUserRole: UserRole = "guest";

// --------------------------------------------------
// Exercise 3:
// ProductStatus için label map oluştur.
// satisfies Record<ProductStatus, string> kullan.
// --------------------------------------------------

const productStatusLabels = {
  draft: "Draft",
  active: "Active",
  archived: "Archived",
} satisfies Record<ProductStatus, string>;

console.log(productStatusLabels.archived);
// Expected output: "Archived"

// Bunlar compile olmamalı:
//
// const missingProductStatusLabels = {
//   draft: "Draft",
//   active: "Active",
// } satisfies Record<ProductStatus, string>;
//
// const extraProductStatusLabels = {
//   draft: "Draft",
//   active: "Active",
//   archived: "Archived",
//   deleted: "Deleted",
// } satisfies Record<ProductStatus, string>;

// --------------------------------------------------
// Exercise 4:
// Permission listesi oluştur.
// Değerler:
// "products:read"
// "products:create"
// "products:delete"
//
// Permission type'ını listeden üret.
// --------------------------------------------------

const PRODUCT_PERMISSIONS = [
  "products:read",
  "products:create",
  "products:delete",
] as const;

type Permission = (typeof PRODUCT_PERMISSIONS)[number];

const permission: Permission = "products:create";

console.log(permission);
// Expected output: "products:create"

// Bu compile olmamalı:
//
// const invalidPermission: Permission = "products:update";

// --------------------------------------------------
// Exercise 5:
// PermissionConfig type'ı oluştur.
//
// Alanlar:
// label: string
// risk: "low" | "medium" | "high"
// auditRequired: boolean
//
// permissionConfig object'ini satisfies ile güvenli yap.
// --------------------------------------------------

type RiskLevel = "low" | "medium" | "high";

type PermissionConfig = {
  label: string;
  risk: RiskLevel;
  auditRequired: boolean;
};

const permissionConfig = {
  "products:read": {
    label: "Read products",
    risk: "low",
    auditRequired: false,
  },
  "products:create": {
    label: "Create products",
    risk: "medium",
    auditRequired: true,
  },
  "products:delete": {
    label: "Delete products",
    risk: "high",
    auditRequired: true,
  },
} satisfies Record<Permission, PermissionConfig>;

console.log(permissionConfig["products:delete"].auditRequired);
// Expected output: true

// --------------------------------------------------
// Exercise 6:
// AUTH_EVENTS array'i oluştur.
// Değerler:
// "login_success"
// "login_failed"
// "logout"
//
// AuthEvent type'ını array'den üret.
// authEventRisk map'ini satisfies ile güvenli yap.
// --------------------------------------------------

const AUTH_EVENTS = ["login_success", "login_failed", "logout"] as const;

type AuthEvent = (typeof AUTH_EVENTS)[number];

const authEventRisk = {
  login_success: "low",
  login_failed: "medium",
  logout: "low",
} satisfies Record<AuthEvent, RiskLevel>;

console.log(authEventRisk.login_failed);
// Expected output: "medium"

// --------------------------------------------------
// Exercise 7:
// logAuthEvent fonksiyonu yaz.
// Sadece AuthEvent kabul etsin.
// Event ve risk seviyesini console'a yazsın.
// --------------------------------------------------

function logAuthEvent(event: AuthEvent): void {
  console.log(`Auth event: ${event}, risk: ${authEventRisk[event]}`);
}

logAuthEvent("login_failed");
// Expected output: "Auth event: login_failed, risk: medium"

// Bu compile olmamalı:
//
// logAuthEvent("password_reset");

// --------------------------------------------------
// Exercise 8:
// RouteConfig type'ı oluştur.
//
// path: string
// requiresAuth: boolean
//
// routes object'i oluştur.
// home, dashboard, admin route'ları olsun.
// satisfies Record<string, RouteConfig> kullan.
//
// RouteName type'ını keyof typeof routes ile üret.
// --------------------------------------------------

type RouteConfig = {
  path: string;
  requiresAuth: boolean;
};

const routes = {
  home: {
    path: "/",
    requiresAuth: false,
  },
  dashboard: {
    path: "/dashboard",
    requiresAuth: true,
  },
  admin: {
    path: "/admin",
    requiresAuth: true,
  },
} satisfies Record<string, RouteConfig>;

type RouteName = keyof typeof routes;

const routeName: RouteName = "admin";

console.log(routes[routeName].path);
// Expected output: "/admin"

// Bu compile olmamalı:
//
// const invalidRouteName: RouteName = "settings";

// --------------------------------------------------
// Exercise 9:
// Test fixture için satisfies kullan.
//
// TestUser type:
// id: string
// email: string
// role: UserRole
// isActive: boolean
//
// testSupportUser object'i TestUser'a satisfies ile uysun.
// --------------------------------------------------

type TestUser = {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
};

const testSupportUser = {
  id: "u-test-1",
  email: "support@example.com",
  role: "support",
  isActive: true,
} satisfies TestUser;

console.log(testSupportUser.role);
// Expected output: "support"

// Bu compile olmamalı:
//
// const invalidTestUser = {
//   id: "u-test-2",
//   email: "broken@example.com",
//   role: "guest",
//   isActive: true,
// } satisfies TestUser;

// --------------------------------------------------
// Exercise 10:
// Type assertion riskini göster.
// JSON.parse ile gelen değeri User type'ına assert et.
// Bunun runtime validation yapmadığını comment olarak belirt.
// --------------------------------------------------

type User = {
  id: string;
  email: string;
  role: UserRole;
};

const parsedUser = JSON.parse(
  '{"id":"u1","email":"ada@example.com","role":"admin"}'
) as User;

console.log(parsedUser.email);
// Expected output: "ada@example.com"

// Dikkat:
// "as User" runtime validation yapmaz.
// JSON eksik veya yanlış olsa bile TypeScript bunu otomatik doğrulamaz.

const unsafeUser = JSON.parse('{"id":"u2"}') as User;

console.log(unsafeUser.id);
// Expected output: "u2"

// Bu runtime'da riskli olur:
//
// console.log(unsafeUser.email.toUpperCase());

// --------------------------------------------------
// Exercise 11:
// Aşağıdaki kararları yorum olarak açıkla.
//
// as const ne zaman?
// satisfies ne zaman?
// as SomeType ne zaman dikkatli kullanılmalı?
// --------------------------------------------------

/*
as const:
Sabit array/object değerlerinden literal union type üretmek istediğimizde kullanılır.
Örnek: status listesi, role listesi, permission listesi, auth event listesi.

satisfies:
Bir object'in belirli bir type'a uyduğunu kontrol etmek,
ama object'in kendi inferred type bilgisini korumak istediğimizde kullanılır.
Örnek: permission config, status label map, route config, test fixture.

as SomeType:
TypeScript'in bilemediği ama bizim bildiğimiz sınırlı durumlarda kullanılabilir.
Fakat runtime validation yapmaz.
Dış dünyadan gelen veri için tek başına güvenli değildir.
Çok sık kullanılıyorsa type modelinde veya validation tarafında eksik olabilir.
*/