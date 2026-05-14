# Phase 4 Review

## Amaç

Bu review milestone’da Phase 4’te öğrendiğimiz konuları birlikte kullanacağız.

Phase 4 konuları:

- `16-generics`
- `17-utility-types`
- `18-keyof-indexed-access-typeof`
- `19-modules-imports-exports`

Bu phase’in ana amacı şuydu:

> Reusable, maintainable ve gerçek projeye uygun TypeScript type yapıları kurmak.

Artık sadece tek tek type yazmayı değil, mevcut type’lardan yeni type üretmeyi, key/value ilişkilerini güvenli hale getirmeyi ve kodu module sınırlarıyla organize etmeyi biliyoruz.

---

## Phase 4 büyük resmi

Phase 1’de temel type’ları öğrendik.

Phase 2’de alias, interface, union ve discriminated union gibi modelleme araçlarını gördük.

Phase 3’te `unknown`, `any`, `never`, type guard, error handling ve async TypeScript konularını işledik.

Phase 4 ise şunu öğretti:

> TypeScript’i gerçek codebase içinde tekrar kullanılabilir ve sürdürülebilir hale getirmek.

Bu phase’teki konular genelde tek başına değil, birlikte kullanılır.

Örnek:

```ts
export const TASK_STATUSES = ["todo", "in_progress", "done"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  assigneeId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskRequest = Pick<Task, "title" | "assigneeId">;

export type UpdateTaskRequest = Partial<Pick<Task, "title" | "status">>;

export type TaskResponse = ApiResponse<Task>;
```

Bu küçük örnekte şunlar birlikte çalışıyor:

- `as const`
- `typeof`
- indexed access
- utility types
- generic API response
- module export

---

## Generics review

Generics, aynı yapıyı farklı type’larla güvenli şekilde kullanmamızı sağlar.

```ts
type ApiResponse<T> = {
  success: boolean;
  data: T;
  requestId: string;
};
```

Burada response shape sabit, ama `data` type’ı değişkendir.

```ts
type TaskResponse = ApiResponse<Task>;
type UserResponse = ApiResponse<User>;
type ProductResponse = ApiResponse<Product>;
```

Generic düşünme şekli:

> Yapı aynı mı kalıyor, sadece içindeki type mı değişiyor?

Cevap evetse generic uygun olabilir.

---

## Utility types review

Utility types, mevcut type’lardan yeni type üretir.

```ts
type CreateTaskRequest = Pick<Task, "title" | "assigneeId">;
```

Bu, sadece create sırasında client’ın göndermesine izin verilen alanları seçer.

```ts
type UpdateTaskRequest = Partial<Pick<Task, "title" | "status">>;
```

Bu, update sırasında `title` veya `status` alanlarından herhangi birinin gönderilebileceğini söyler.

Önemli sezgi:

- `Pick` izin verilen alanları açıkça seçer.
- `Omit` bazı alanları çıkarır.
- Security-sensitive request modellerinde genelde `Pick` daha güvenlidir.
- `Partial` update modellerinde yaygındır.
- `Record` key/value map yapılarında güçlüdür.
- `Readonly` config/session gibi yanlışlıkla değişmemesi gereken yapılarda işe yarar.

---

## `keyof`, indexed access ve `typeof` review

`keyof`, object type’ın key’lerinden union üretir.

```ts
type TaskKey = keyof Task;
```

Bu şuna benzer:

```ts
type TaskKey =
  | "id"
  | "title"
  | "status"
  | "assigneeId"
  | "createdAt"
  | "updatedAt";
```

Indexed access, property value type’ını çıkarır.

```ts
type TaskStatus = Task["status"];
```

`typeof`, mevcut runtime value’dan type üretir.

```ts
const TASK_STATUSES = ["todo", "in_progress", "done"] as const;

type TaskStatus = (typeof TASK_STATUSES)[number];
```

Bu pattern çok önemlidir.

Çünkü hem runtime’da kullanılabilecek bir listeye sahip oluruz hem de aynı listeden type üretiriz.

Böylece runtime value ve compile-time type birbirinden kopmaz.

---

## Generic key/value helper review

Phase 4’ün en güçlü pattern’lerinden biri şudur:

```ts
function getValue<T, K extends keyof T>(item: T, key: K): T[K] {
  return item[key];
}
```

Bu fonksiyon:

- herhangi bir object alır
- sadece o object’in geçerli key’lerini kabul eder
- return type’ı verilen key’e göre belirler

Örnek:

```ts
const title = getValue(task, "title");
// string

const status = getValue(task, "status");
// "todo" | "in_progress" | "done"
```

Bu pattern form field, table column, sorting, filtering ve test assertion helper’larında çok kullanılır.

---

## Module review

Kod büyüdükçe type’ları ve helper’ları dosyalara bölmek gerekir.

Örnek gerçek proje organizasyonu:

```txt
src/
  models/
    task.ts
    user.ts
  types/
    api.ts
  utils/
    object.ts
  index.ts
```

Module organizasyonunda ana kurallar:

- Her şeyi export etme.
- Sadece public kullanılması gereken type/value’ları export et.
- Sadece type için `import type` kullan.
- Named export’u varsayılan tercih yap.
- Internal helper’ları dosya içinde bırak.
- Barrel export kullanırken internal detayları dışarı açma.

İyi module organizasyonu sadece temizlik değildir.

Şunları doğrudan etkiler:

- refactor güvenliği
- test edilebilirlik
- dependency karmaşası
- ekip içinde okunabilirlik
- frontend/backend shared type düzeni
- security-sensitive modellerin yanlış kullanılmasını önleme

---

## Security ve maintainability sezgisi

TypeScript type’ları güvenlik bariyeri değildir ama yanlış kullanımı azaltan güçlü bir engineering aracıdır.

Örnek riskli yaklaşım:

```ts
type CreateUserRequest = Omit<User, "id" | "createdAt" | "updatedAt">;
```

Eğer `User` içinde `role` varsa, bu type client’ın role göndermesine izin verebilir.

Daha güvenli yaklaşım:

```ts
type CreateUserRequest = Pick<User, "email" | "name">;
```

Bu daha kontrollüdür çünkü sadece izin verilen alanları açar.

Genel kural:

> Dış dünyadan gelen request modellerinde alanları bilinçli seç.

Bu yaklaşım ileride auth, RBAC, API validation ve secure backend development için çok önemlidir.

---

## Phase 4 sonunda bilmen gerekenler

Bu phase sonunda şunları yapabiliyor olmalısın:

- Generic function yazmak
- Generic type alias ve interface yazmak
- Generic constraint kullanmak
- API response gibi reusable type yapıları kurmak
- `Partial`, `Pick`, `Omit`, `Record`, `Readonly` gibi utility type’ları gerçekçi şekilde kullanmak
- Object key’lerini `keyof` ile type-safe yapmak
- Property value type’larını indexed access ile çıkarmak
- Runtime constant’lardan `typeof` ve `as const` ile type üretmek
- Type-only import/export ayrımını anlamak
- Module sınırlarını temiz kurmak
- Public/internal export ayrımı yapmak
- Type tekrarını azaltmak
- Request/update/public model gibi derived type’lar üretmek

---

## Kısa özet

Phase 4, TypeScript’i gerçek projeye yaklaştıran phase oldu.

Bu phase’in özü:

- Generic ile reusable yapı kur.
- Utility types ile mevcut modellerden yeni modeller üret.
- `keyof` ve indexed access ile key/value ilişkisini güvenli hale getir.
- `typeof` ve `as const` ile runtime value’dan type üret.
- Module sistemiyle kodu sorumluluklara göre organize et.
- Dış dünyaya açılan request modellerinde kontrollü ve güvenli alan seçimi yap.

Burada bırakmak Phase 4 için mantıklı. Bu temel, React + TypeScript, Node/Express API, shared types, API testing ve security-focused backend modelleri için yeterli bir zemin oluşturur.
