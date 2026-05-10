# Phase 2 Review - Reusable Domain Types and Safe State Modeling

## Phase 2'de ne öğrendik?

Gerçek projelerde tekrar eden object shape problemini çözmek, reusable domain types yazmak ve uygulama modellerini daha okunabilir/güvenli hale getirmek.

Bunun için şu konuları işledik:

- type aliases
- interfaces
- unions and narrowing
- discriminated unions
- enums vs literal unions

Bu konular birlikte kullanıldığında TypeScript sadece "değişken tipi yazma" aracı olmaktan çıkar, uygulamanın domain kurallarını daha güvenli modellememizi sağlar.

## Type alias review

Type alias, bir type shape'e isim vermemizi sağlar.

```ts
type TaskId = string;

type Task = {
  readonly id: TaskId;
  title: string;
  status: TaskStatus;
};
```

Type alias özellikle şunlarda güçlüdür:

- primitive alias
- object shape
- literal union
- union type
- discriminated union
- intersection composition

Örnek:

```ts
type ApiResult =
  | { status: "success"; data: Task }
  | { status: "error"; error: string };
```

Bu yapı interface ile değil, type alias ile daha doğal ifade edilir.

---

## Interface review

Interface özellikle object shape tanımlamak için okunabilir bir alternatiftir.

```ts
interface User {
  readonly id: string;
  email: string;
  role: UserRole;
}
```

Şu durumlarda interface tercih edilebilir:

- sadece object model tanımlıyorsan
- `extends` ile genişletme okunabilir olacaksa
- codebase standardı interface ise

Örnek:

```ts
interface AuditFields {
  createdAt: string;
  updatedAt: string;
}

interface Task extends AuditFields {
  readonly id: string;
  title: string;
  status: TaskStatus;
}
```

Ama union/literal union için `type` gerekir:

```ts
type UserRole = "admin" | "user" | "support";
```

---

## Literal union review

Literal union, sınırsız string yerine kontrollü değer seti kullanmamızı sağlar.

Zayıf model:

```ts
type User = {
  role: string;
};
```

Güçlü model:

```ts
type UserRole = "admin" | "user" | "support";

type User = {
  role: UserRole;
};
```

Gerçek projelerde literal union şu alanlarda çok değerlidir:

- role
- permission
- status
- security action
- API state
- environment
- event type

---

## `as const` review

Bazen hem runtime'da listeye hem compile-time'da type'a ihtiyacımız olur.

```ts
const taskStatuses = ["todo", "in_progress", "done", "blocked"] as const;

type TaskStatus = (typeof taskStatuses)[number];
```

Bu pattern iki şeyi aynı anda sağlar:

1. Runtime liste:

```ts
taskStatuses.includes("done");
```

2. Compile-time type:

```ts
type TaskStatus = "todo" | "in_progress" | "done" | "blocked";
```

Bu özellikle validation, form select options, test data ve API input handling için faydalıdır.

---

## Narrowing review

Union kullandığında TypeScript'e hangi ihtimalde olduğunu göstermen gerekir.

```ts
type Id = string | number;

function formatId(id: Id): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  }

  return id.toString();
}
```

Başlangıçta `id` geniştir:

```ts
string | number
```

Kontrolden sonra daralır:

```ts
string
```

veya:

```ts
number
```

Bu narrowing'dir.

---

## Discriminated union review

Discriminated union, farklı state'leri güvenli modellemek için kullanılır.

Zayıf model:

```ts
type TaskLoadState = {
  isLoading: boolean;
  task?: Task;
  error?: string;
};
```

Bu invalid state'e izin verir:

```ts
const badState: TaskLoadState = {
  isLoading: true,
  task: someTask,
  error: "Failed",
};
```

Daha güçlü model:

```ts
type TaskLoadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; task: Task }
  | { status: "error"; error: string };
```

Bu modelde invalid combination temsil edilemez.

---

## Exhaustive check review

Discriminated union kullanırken `switch` + `never` güçlü bir güvenlik ağıdır.

```ts
function getTaskLoadMessage(state: TaskLoadState): string {
  switch (state.status) {
    case "idle":
      return "Idle";

    case "loading":
      return "Loading";

    case "success":
      return state.task.title;

    case "error":
      return state.error;

    default: {
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
    }
  }
}
```

Eğer ileride yeni bir state eklenir ama switch güncellenmezse TypeScript hata verir.

Bu büyük codebase'lerde çok değerli bir refactor güvenliğidir.

---

## Enum vs literal union review

Enum:

```ts
enum UserRoleEnum {
  Admin = "admin",
  User = "user",
}
```

Literal union:

```ts
type UserRole = "admin" | "user";
```

Modern TypeScript uygulamalarında çoğu API modelinde literal union daha sade ve doğaldır.

Çünkü JSON zaten string taşır:

```json
{
  "role": "admin"
}
```

Ama enum da bazı codebase'lerde geçerlidir. Özellikle ekip standardı enum ise ona uyulur.

Pratik kural:

- yeni API/shared type yazıyorsan önce literal union düşün
- runtime liste gerekiyorsa `as const` pattern kullan
- mevcut codebase enum kullanıyorsa tutarlı kal
- numeric enum'lardan dikkatli ol
- sınırsız `string` ile role/status/action modelleme

---

## Review domain: task management + security

Bu review için küçük domain'imiz:

- kullanıcılar
- roller
- permission değerleri
- task status değerleri
- task modeli
- API result
- task loading state
- permission check result
- security log

Bunlar ileride React, Node, API testing, Cypress ve AppSec konularına bağlanabilecek gerçekçi modellerdir.

---

## İyi modelleme hedefi

İyi TypeScript modellemesi sadece şunu demez:
> Bu field string.

Daha iyi TypeScript modellemesi şunu der:
> Bu field sadece sistemin izin verdiği değerlerden biri olabilir.

Örnek:

```ts
type SecurityAction =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "TASK_CREATED"
  | "PERMISSION_DENIED";
```

Bu model rastgele log action yazılmasını engeller.
Bu da şunları iyileştirir:

- test assertion güvenilirliği
- dashboard tutarlılığı
- log arama kalitesi
- alert rule doğruluğu
- güvenlik olaylarının analiz edilebilirliği
