# 04 - Functions

## Parameter types: Fonksiyon parametrelerine type yazabiliriz.

```ts
function greetUser(email: string): string {
  return `Welcome, ${email}`;
}
```

## Return type

Fonksiyonun döndürdüğü değere de type yazabiliriz.

```ts
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}
```

Burada `: number`, fonksiyonun number döndürmesi gerektiğini söyler.

Eğer yanlışlıkla string döndürürsek TypeScript hata verir:

```ts
function calculateTotal(price: number, quantity: number): number {
  return "invalid";
}
```

## Return type her zaman yazılmalı mı?

Basit fonksiyonlarda TypeScript return type'ı kendisi anlayabilir.

```ts
function add(a: number, b: number) {
  return a + b;
}
```

## void return type

Bazı fonksiyonlar değer döndürmez, sadece iş yapar.

```ts
function logAuditEvent(message: string): void {
  console.log(message);
}
```

## Object parameter

Fonksiyona object parametre geçebiliriz.

```ts
function printUser(user: { email: string; isActive: boolean }): void {
  console.log(`${user.email} active: ${user.isActive}`);
}
```

## Object return type

Fonksiyon object de döndürebilir.

```ts
function createUser(email: string): {
  email: string;
  isActive: boolean;
} {
  return {
    email,
    isActive: true,
  };
}
```

Bu fonksiyonun contract'ı şudur:

```txt
Input:
- email: string

Output:
- email: string
- isActive: boolean
```

Bu yaklaşım API request/response modelleme için çok önemlidir.

## Optional parameters

Bazı parametreler opsiyonel olabilir.

```ts
function createAuditMessage(action: string, actorEmail?: string): string {
  if (actorEmail === undefined) {
    return `System performed ${action}`;
  }

  return `${actorEmail} performed ${action}`;
}
```

Buradaki `actorEmail?: string` şu anlama gelir:
actorEmail string olabilir veya hiç gönderilmeyebilir.

Optional parametreler genelde sona yazılır. Doğru:
function sendEmail(to: string, subject?: string): void {}

Kötü:
function sendEmail(subject?: string, to: string): void {}

Çünkü optional parametre başta olursa çağırırken anlam karışır.

## Default parameters

Bir parametre gönderilmezse varsayılan değer kullanabiliriz.

function createPageUrl(page: number = 1): string {
return `/courses?page=${page}`;
}

Çağırırken:
createPageUrl(); // "/courses?page=1"
createPageUrl(3); // "/courses?page=3"

Default parametrelerde TypeScript çoğu zaman type'ı kendisi çıkarabilir, ama açık yazmak da okunabilirliği artırır.

## Function type annotation

Bir değişkene fonksiyon atayacaksak onun type'ını yazabiliriz.

```ts
const canLogin: (isActive: boolean, failedAttempts: number) => boolean =
  function (isActive, failedAttempts) {
    return isActive && failedAttempts < 5;
  };
```

Burada type şudur:

```txt
(isActive: boolean, failedAttempts: number) => boolean
```

Yani:

- boolean parametre
- number parametre
- boolean return

Arrow function ile de yazabiliriz:

```ts
const canAccessAdmin: (role: string, isActive: boolean) => boolean = (
  role,
  isActive,
) => {
  return role === "admin" && isActive;
};
```

## Callback function types

Callback, başka bir fonksiyona parametre olarak gönderilen fonksiyondur.

```ts
function processUserEmail(
  email: string,
  formatter: (email: string) => string,
): string {
  return formatter(email);
}
```

Burada `formatter` bir fonksiyondur. Type'ı:
(email: string) => string

Yani string alır, string döndürür. Kullanım:

```ts
const normalized = processUserEmail(" ADMIN@EXAMPLE.COM ", function (email) {
  return email.trim().toLowerCase();
});
```

Callback types ileride çok önemli olacak çünkü:

- array methods callback kullanır
- React event handler callback kullanır
- Cypress commands callback kullanır
- test assertion callback kullanır
- async işlemlerde callback mantığını görürüz

---

## Fonksiyonlarda boolean return

Boolean döndüren fonksiyonlar genelde karar fonksiyonlarıdır. İsimlendirme önemli:

```ts
function isActiveUser(user: { isActive: boolean }): boolean {
  return user.isActive;
}
```

İyi boolean fonksiyon isimleri genelde şunlarla başlar:

```txt
is...
has...
can...
should...
```

Örnekler:

```ts
canLogin();
isAccountLocked();
hasPermission();
shouldRetry();
```

Bu isimler kodu okunur hale getirir.

## Security örneği: permission check

Basit bir permission check fonksiyonu:

```ts
function hasPermission(
  userPermissions: string[],
  requiredPermission: string,
): boolean {
  return userPermissions.includes(requiredPermission);
}
```

Bu fonksiyon:

- kullanıcının permission listesini alır
- gereken permission'ı alır
- listede var mı kontrol eder

Şimdilik permission'ları `string` olarak tutuyoruz.
İleride literal union types ile bunu daha güvenli hale getireceğiz.

## Risk: string type çok geniş olabilir

Şu fonksiyon teknik olarak doğru:

```ts
function canAccess(role: string): boolean {
  return role === "admin";
}
```

Ama `role: string` çok geniştir. Bu fonksiyon şunları kabul eder:

```ts
canAccess("admin");
canAccess("user");
canAccess("wrong-role");
canAccess("banana");
```

TypeScript buna izin verir çünkü hepsi string. İleride bunu şöyle daraltacağız:

```ts
type Role = "admin" | "manager" | "user";
```

Şimdilik önemli olan: primitive type güvenlik sağlar ama domain type kadar güçlü değildir.
