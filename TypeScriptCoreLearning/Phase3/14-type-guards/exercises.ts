// 13-type-guards/exercises.ts

// Exercise 1:
// Aşağıdaki type için isSession type guard fonksiyonunu yaz.
// Kontrol edilecek alanlar:
// - token: string
// - userId: number
// - expiresAt: string

type Session = {
  token: string;
  userId: number;
  expiresAt: string;
};

function isSession(value: unknown): value is Session {
  // Burayı tamamla.
  return false;
}


// Exercise 2:
// Aşağıdaki rawSession değerini isSession ile kontrol et.
// Geçerliyse token değerini yazdır.
// Geçersizse "Invalid session" yazdır.

const rawSession: unknown = {
  token: "abc123",
  userId: 42,
  expiresAt: "2026-01-01T10:00:00Z",
};

// Burayı tamamla.


// Exercise 3:
// Aşağıdaki Role type'ı için isRole type guard yaz.
// Sadece "admin", "user", "viewer" değerleri geçerli olsun.

type Role = "admin" | "user" | "viewer";

function isRole(value: unknown): value is Role {
  // Burayı tamamla.
  return false;
}


// Exercise 4:
// Aşağıdaki AuditLog type'ı için type guard yaz.
// Kontrol edilecek alanlar:
// - id: number
// - action: string
// - createdAt: string
// - actorRole: Role

type AuditLog = {
  id: number;
  action: string;
  createdAt: string;
  actorRole: Role;
};

function isAuditLog(value: unknown): value is AuditLog {
  // Burayı tamamla.
  return false;
}


// Exercise 5:
// AuditLog array kontrolü yapan isAuditLogArray fonksiyonunu yaz.
// Array.isArray ve every kullan.

function isAuditLogArray(value: unknown): value is AuditLog[] {
  // Burayı tamamla.
  return false;
}


// Exercise 6:
// Aşağıdaki rawLogs değerini kontrol et.
// Geçerliyse her log için action değerini yazdır.
// Geçersizse "Invalid audit logs" yazdır.

const rawLogs: unknown = [
  {
    id: 1,
    action: "USER_LOGIN",
    createdAt: "2026-01-01T10:00:00Z",
    actorRole: "admin",
  },
  {
    id: 2,
    action: "USER_LOGOUT",
    createdAt: "2026-01-01T11:00:00Z",
    actorRole: "user",
  },
];

// Burayı tamamla.