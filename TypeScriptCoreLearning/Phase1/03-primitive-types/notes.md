# 03 - Primitive Types
Primitive type, JavaScript ve TypeScript'teki en temel değer tipleridir.

## string: 
`string`, metinsel değerleri temsil eder.

```ts
const email: string = "admin@example.com";
const userName: string = "Ada";
const role: string = "admin";
```
```ts
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
```
Burada `email` string olmazsa `.trim()` ve `.toLowerCase()` güvenli şekilde kullanılamaz.

## number
`number`, sayısal değerleri temsil eder.
TypeScript'te ayrı ayrı `int`, `float`, `double` yoktur. Hepsi `number` ile ifade edilir.

```ts
const price: number = 99.99;
const quantity: number = 3;
const failedLoginAttempts: number = 2;
```
```ts
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}
```

## boolean
`boolean`, sadece iki değer alır:

```ts
const isActive: boolean = true;
const isEmailVerified: boolean = false;
const isAccountLocked: boolean = false;
```
Gerçek projede boolean genelde karar vermek için kullanılır:
```ts
function canLogin(isActive: boolean, isAccountLocked: boolean): boolean {
  return isActive && !isAccountLocked;
}
```
Boolean değerler özellikle auth, authorization, feature flags ve test assertion tarafında sık görülür.

## null
`null`, bilinçli olarak "değer yok" demektir.

```ts
let selectedUserId: string | null = null;
selectedUserId = "user-123";
```
>>> Şu anda seçili kullanıcı yok, ama ileride olabilir. 

Gerçek projelerde `null` genelde bilinçli boşluğu temsil eder:
- selected item yok
- user profile henüz gelmedi
- optional ilişki yok
- logout sonrası session temizlendi

```ts
let currentSessionToken: string | null = null;
currentSessionToken = "token-abc";
currentSessionToken = null;
```
Bu yapı auth tarafında çok yaygındır.

## undefined
`undefined`, bir değerin henüz atanmadığını veya bir property'nin mevcut olmadığını ifade eder.
```ts
let lastLoginAt: string | undefined;
lastLoginAt = "2026-05-09T10:00:00Z";
```

Object property'lerde de sık görülür:
```ts
const user = {
  email: "admin@example.com",
  lastLoginAt: undefined,
};
```

`undefined` genelde şu durumlarda karşımıza çıkar:
- değer henüz set edilmedi
- optional property yok
- function bir şey return etmedi
- array içinde aranan değer bulunamadı

## null ve undefined farkı
İkisi de "değer yok" gibi görünür ama niyetleri farklıdır.
```ts
let profileImageUrl: string | null = null;
```
Bu genelde şunu anlatır:
>>> Kullanıcının profil resmi bilinçli olarak yok.

```ts
let lastLoginAt: string | undefined;
```
Bu ise şunu anlatır:
>>> Bu bilgi henüz atanmadı veya elimizde yok.

## Type inference

Her yerde açık type yazmak gerekmez. TypeScript bunları otomatik anlar:
email    -> string
price    -> number
isActive -> boolean

Bu yüzden basit `const` değerlerde genelde annotation yazmayız. Yani bu gereksiz olabilir:
```ts
const email: string = "admin@example.com";
```

Şu daha temizdir:
```ts
const email = "admin@example.com";
```

Ama fonksiyon parametrelerinde type yazmak önemlidir:
```ts
function sendEmail(to: string, subject: string): void {
  console.log(`Sending email to ${to}: ${subject}`);
}
```
Çünkü TypeScript parametre tiplerini her zaman güvenli şekilde tahmin edemez.

## let ve const ile type davranışı
`const` ile tanımlanan değer değişmez.
```ts
const role = "admin";
```
TypeScript burada role için sadece `string` değil, daha dar bir type da düşünebilir:

role -> "admin"
Çünkü bu değer değişmeyecek.

Ama `let` ile tanımlarsan değer değişebilir:
```ts
let role = "admin";
role = "user";
```
Burada TypeScript genelde type'ı genişletir:
```
role -> string
```

## Explicit annotation ne zaman yazılır?
Şuralarda açık type yazmak faydalıdır:
```ts
let sessionToken: string | null = null;
```

Çünkü başlangıçta `null`, ama ileride string olacak.
Eğer şöyle yazarsan:
```ts
let sessionToken = null;
```
TypeScript bunu sadece `null` gibi anlayabilir veya ayarlara göre geniş davranabilir. Bu da niyeti net göstermez. Daha iyi kullanım:

```ts
let sessionToken: string | null = null;
```
Bu kod açıkça şunu söyler:
>>> Token şu anda yok, ama login sonrası string olabilir.

## void kısa notu
`void`, bir fonksiyonun anlamlı bir değer döndürmediğini anlatır.

function logSecurityEvent(message: string): void {
  console.log(message);
}

Bu fonksiyon bir değer üretmez, sadece log basar. 
`void` primitive type gibi günlük değer saklamak için kullanılmaz. 
Ama fonksiyon return type olarak çok sık karşımıza çıkar.

## Güvenlik açısından primitive types
Primitive types küçük görünür ama güvenlikte önemlidir.
```ts
function canAccessAdminPanel(role: string, isActive: boolean): boolean {
  return role === "admin" && isActive;
}
```
Bu kod çalışır ama `role: string` çok geniştir. Çünkü `"admin"`, `"user"`, `"anything"` hepsi string'dir.
İleride bunu daha güvenli hale getireceğiz:
```ts
type Role = "admin" | "user" | "manager";
```
Ama şu an için önemli olan şey şu:
Primitive types temel güvenliği sağlar, fakat domain kurallarını tek başına yeterince daraltmaz.

## Kısa özet

- `string` metinsel veriler içindir.
- `number` tüm sayısal değerler içindir.
- `boolean` true/false kararları içindir.
- `null` bilinçli boşluğu temsil eder.
- `undefined` henüz yok veya atanmadı anlamına gelir.
- Basit `const` değerlerde type inference yeterlidir.
- Fonksiyon parametrelerinde açık type yazmak önemlidir.
- `string | null` gibi union yapılar gerçek projelerde çok kullanılır.
- Primitive types temel güvenlik sağlar ama domain kurallarını tam modellemez.

