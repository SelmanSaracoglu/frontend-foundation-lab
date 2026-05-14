# 02 - TSConfig and Strictness Basics

## Amaç

Bu milestone’da TypeScript compiler ayarlarının kod kalitesini nasıl etkilediğini öğreneceğiz.

Odak konular:

- `tsconfig.json` ne işe yarar?
- `strict` neden önemlidir?
- `noImplicitAny`
- `strictNullChecks`
- `noUncheckedIndexedAccess`
- `exactOptionalPropertyTypes`
- compiler ayarlarını “gerçek bug yakalama” açısından okumak

Bu milestone kurulum veya tooling dersi değildir.

Ana fikir:

> TypeScript sadece type yazınca güçlü olmaz. Compiler’ın ne kadar sıkı kontrol yapacağını da doğru ayarlamak gerekir.

---

## `tsconfig.json` nedir?

`tsconfig.json`, TypeScript compiler’ın projeyi nasıl kontrol edeceğini belirleyen config dosyasıdır.

Basit örnek:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

Bu ayar TypeScript’e şunu söyler:

> Kodumu daha sıkı type checking ile kontrol et.

Gerçek projelerde `tsconfig.json` şunları etkiler:

- hangi dosyalar compile edilir?
- JavaScript çıktısı hangi hedef sürüme göre üretilir?
- module sistemi nasıl davranır?
- type checking ne kadar sıkıdır?
- null/undefined hataları yakalanır mı?
- implicit `any` kabul edilir mi?
- object property ve indexed access davranışı ne kadar güvenlidir?

Bu milestone’da özellikle type safety ayarlarına odaklanacağız.

---

## Neden strict mode önemlidir?

TypeScript’in asıl değeri bug’ları runtime’dan önce yakalamasıdır.

Ama bazı önemli kontroller sadece strict ayarlar açıksa güçlü çalışır.

Örnek:

```ts
function normalizeEmail(email) {
  return email.trim().toLowerCase();
}
```

Eğer `noImplicitAny` kapalıysa, `email` otomatik olarak `any` olabilir.

Bu durumda şunlar TypeScript tarafından yeterince iyi yakalanmaz:

```ts
normalizeEmail(123);
normalizeEmail(null);
```

Strict mode, TypeScript’i daha ciddi bir reviewer gibi çalıştırır.

---

## `strict`

`strict`, birçok sıkı type checking ayarını birlikte açar.

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

Bu ayar tek başına şu zihinsel kararı temsil eder:

> TypeScript projesinde gevşek type checking yerine güvenli varsayılanları kullan.

`strict: true`, özellikle profesyonel projelerde güçlü bir default’tur.

Yeni başlayan için başta biraz daha fazla hata gösterebilir, ama bu hatalar genelde gerçek düşünme eksiklerini ortaya çıkarır.

---

## `noImplicitAny`

`noImplicitAny`, TypeScript’in otomatik olarak `any` çıkarmasını engeller.

Problemli örnek:

```ts
function normalizeEmail(email) {
  return email.trim().toLowerCase();
}
```

Burada `email` parametresinin type’ı yazılmamış.

`noImplicitAny` açıkken TypeScript şunu söyler:

```txt
Parameter 'email' implicitly has an 'any' type.
```

Daha iyi:

```ts
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
```

Bu ayar neden önemli?

Çünkü `any`, type safety’yi devre dışı bırakır.

```ts
function normalizeEmail(email: any): string {
  return email.trim().toLowerCase();
}

normalizeEmail(123);
```

Bu compile olabilir ama runtime’da patlayabilir.

`noImplicitAny`, istemeden `any` üretmeni engeller.

---

## `strictNullChecks`

`strictNullChecks`, `null` ve `undefined` değerlerinin ayrı ve ciddi type ihtimali olarak ele alınmasını sağlar.

Bu ayar kapalıyken TypeScript, `null`/`undefined` konusunda fazla gevşek davranabilir.

Problemli örnek:

```ts
type User = {
  id: string;
  email: string;
};

function findUserById(users: User[], id: string): User | undefined {
  return users.find((user) => user.id === id);
}

const user = findUserById([], "u1");

console.log(user.email);
```

`findUserById` `undefined` dönebilir.

`strictNullChecks` açıkken TypeScript şunu yakalar:

```txt
'user' is possibly 'undefined'.
```

Daha güvenli:

```ts
if (user !== undefined) {
  console.log(user.email);
}
```

veya:

```ts
console.log(user?.email);
```

Bu ayar gerçek projede çok önemlidir çünkü birçok runtime bug `undefined` üzerinden property okumaktan çıkar.

---

## `noUncheckedIndexedAccess`

`noUncheckedIndexedAccess`, array veya object index erişimlerinde sonucun `undefined` olabileceğini hesaba katar.

Problemli örnek:

```ts
const users = ["ada@example.com", "linus@example.com"];

const firstUser = users[0];

console.log(firstUser.toUpperCase());
```

Bu örnekte `users[0]` var gibi görünüyor.

Ama TypeScript genel kural olarak array index erişiminde elemanın gerçekten var olduğunu garanti edemez.

Özellikle şu durumda:

```ts
const users: string[] = [];

const firstUser = users[0];

console.log(firstUser.toUpperCase());
```

Runtime’da hata olur.

`noUncheckedIndexedAccess` açıkken `users[0]` type’ı:

```ts
string | undefined
```

olur.

Daha güvenli:

```ts
const firstUser = users[0];

if (firstUser !== undefined) {
  console.log(firstUser.toUpperCase());
}
```

Bu ayar özellikle şunlarda faydalıdır:

- array access
- Record access
- dictionary/map-like object access
- API response listeleri
- table row access
- test data access

---

## `Record` erişiminde `noUncheckedIndexedAccess`

Örnek:

```ts
type User = {
  id: string;
  email: string;
};

const usersById: Record<string, User> = {
  u1: {
    id: "u1",
    email: "ada@example.com",
  },
};

const user = usersById["missing-id"];

console.log(user.email);
```

Runtime’da `user` undefined olabilir.

`noUncheckedIndexedAccess` açıkken TypeScript bunu yakalar.

Daha güvenli:

```ts
const user = usersById["missing-id"];

if (user !== undefined) {
  console.log(user.email);
}
```

Bu özellikle backend ve test automation tarafında önemlidir.

Çünkü dictionary lookup işlemleri sık kullanılır.

---

## `exactOptionalPropertyTypes`

`exactOptionalPropertyTypes`, optional property davranışını daha net hale getirir.

Şu type’ı düşün:

```ts
type UpdateUserRequest = {
  email?: string;
};
```

Bu property’nin anlamı şudur:

> email gönderilmeyebilir.

Yani şu geçerlidir:

```ts
const request: UpdateUserRequest = {};
```

Ama şu her zaman aynı anlamda değildir:

```ts
const request: UpdateUserRequest = {
  email: undefined,
};
```

`email` property’sinin hiç gönderilmemesi ile `email: undefined` olarak gönderilmesi farklı şeyler olabilir.

Özellikle API update payload’larında bu fark önemlidir.

`exactOptionalPropertyTypes` açıkken TypeScript optional property’leri daha doğru yorumlar.

Eğer gerçekten `undefined` değerine izin vermek istiyorsan type’ı açık yazman gerekir:

```ts
type UpdateUserRequest = {
  email?: string | undefined;
};
```

Bu ayar özellikle PATCH/update payload tasarımlarında daha net modelleme sağlar.

---

## Optional property ve API update farkı

Şu request’i düşün:

```ts
type UpdateUserRequest = {
  email?: string;
  name?: string;
};
```

Bu şunu anlatır:

```txt
email gönderilmeyebilir.
name gönderilmeyebilir.
```

Ama şu farklı bir niyete sahip olabilir:

```ts
{
  email: undefined
}
```

Bu, property’nin gönderildiğini ama değerinin `undefined` olduğunu ima eder.

API tasarımında genelde şu daha temizdir:

```ts
{}
```

yani “bu alanı güncelleme”.

Bu yüzden `exactOptionalPropertyTypes`, update request type’larını daha bilinçli yazmaya zorlar.

---

## Önerilen başlangıç strict ayarları

TypeScript Core sonrası pratik bir config şöyle olabilir:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

`strict: true` zaten birçok önemli kontrolü açar.

Ek olarak:

```json
"noUncheckedIndexedAccess": true
```

array/object index erişimlerini daha güvenli yapar.

```json
"exactOptionalPropertyTypes": true
```

optional property anlamını daha net hale getirir.

Bu ayarlar başlangıçta biraz daha fazla type hatası gösterebilir ama gerçek proje kalitesi için değerlidir.

---

## TypeScript hata verdiğinde ne yapmalı?

Kötü refleks:

```ts
const user = usersById[id] as User;
```

Bu TypeScript’i susturur ama gerçek riski çözmez.

Daha iyi refleks:

```ts
const user = usersById[id];

if (user === undefined) {
  return {
    success: false,
    error: "User not found",
  };
}

return {
  success: true,
  data: user,
};
```

Yani TypeScript hata verdiğinde şu soruyu sor:

```txt
Bu değer gerçekten her zaman var mı?
Yoksa yokluk ihtimalini modellemem mi gerekiyor?
```

Strict TypeScript seni daha iyi runtime handling yazmaya iter.

---

## Strict ayarlar ve önceki konuların bağlantısı

Phase 3’te `unknown`, type guards ve error handling öğrendik.

Phase 4’te generics, utility types ve key access öğrendik.

Phase 6’daki strict ayarlar bu bilgileri daha önemli hale getirir.

Örnek:

```ts
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}
```

Bu iyi bir modeldir çünkü array boş olabilir.

Kötü model:

```ts
function getFirst<T>(items: T[]): T {
  return items[0];
}
```

`noUncheckedIndexedAccess` açıkken TypeScript bunu daha net sorgulatır.

---

## Strict ayarlar güvenlik sağlar mı?

TypeScript strict ayarları güvenlik aracı değildir ama güvenli kod yazmaya yardımcı olur.

Özellikle şu hataları azaltır:

- `undefined` üzerinden property okuma
- yanlış update payload anlamı
- istemeden `any` kullanımı
- eksik null handling
- yanlış dictionary lookup varsayımı

Ama external input için hâlâ runtime validation gerekir.

TypeScript compile-time kontrol sağlar. Kullanıcıdan, API’den veya dosyadan gelen veri runtime’da doğrulanmalıdır.

---

## Kısa özet

- `tsconfig.json`, TypeScript compiler davranışını belirler.
- `strict: true`, güvenli varsayılanları açar.
- `noImplicitAny`, istemeden `any` oluşmasını engeller.
- `strictNullChecks`, `null` ve `undefined` ihtimallerini ciddiye alır.
- `noUncheckedIndexedAccess`, array/object index erişimlerine `undefined` ihtimalini ekler.
- `exactOptionalPropertyTypes`, optional property anlamını daha doğru yapar.
- Strict ayarlar başlangıçta daha fazla hata gösterir ama daha sağlam kod yazdırır.
- TypeScript hatasını `as` ile susturmak yerine modellemeyi düzeltmek daha iyi mühendisliktir.
