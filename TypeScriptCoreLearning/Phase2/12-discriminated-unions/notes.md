# 12 - Discriminated Unions
Gerçek uygulamalarda bazı değerler birden fazla farklı state'ten biri olabilir.

Örneğin bir API sonucu:
- başarılı olabilir
- hata olabilir
- loading olabilir

Zayıf bir model şöyle olabilir:
```ts
type ApiState = {
  loading?: boolean;
  data?: string;
  error?: string;
};
```

Bu model esnektir ama tehlikelidir. Çünkü şu object teknik olarak mümkün olur:
```ts
const state: ApiState = {
  loading: true,
  data: "User data",
  error: "Something failed",
};
```

Bu mantıksal olarak karışıktır. Bir state aynı anda loading, success ve error olmamalıdır.

Daha güvenli model:
```ts
type LoadingState = {
  status: "loading";
};

type SuccessState = {
  status: "success";
  data: string;
};

type ErrorState = {
  status: "error";
  error: string;
};

type ApiState = LoadingState | SuccessState | ErrorState;
```
Artık her state açık ve güvenlidir.

## Discriminant field nedir?
Discriminant field, union içindeki object'leri ayırt etmek için kullanılan ortak alandır.
Örnekte bu alan `status`:

```ts
type LoadingState = {
  status: "loading";
};

type SuccessState = {
  status: "success";
  data: string;
};

type ErrorState = {
  status: "error";
  error: string;
};
```

Her object'te `status` var ama değeri farklı. TypeScript bu değeri kullanarak narrowing yapar.

## Basit discriminated union
```ts
type ApiResult =
  | {
      status: "success";
      data: string;
    }
  | {
      status: "error";
      error: string;
    };
```

Kullanım:
```ts
function printResult(result: ApiResult): void {
  if (result.status === "success") {
    console.log(result.data);
    return;
  }

  console.log(result.error);
}
```

`result.status === "success"` kontrolünden sonra TypeScript bilir ki:
```ts
result.data
```
güvenlidir.

Else tarafında ise `result.error` güvenlidir.

## Neden boolean success bazen yeterli değildir?

Şu yapı kötü değildir:
```ts
type SuccessResult = {
  success: true;
  data: string;
};

type ErrorResult = {
  success: false;
  error: string;
};

type ApiResult = SuccessResult | ErrorResult;
```

Bu da bir discriminated union'dır. Çünkü `success` ayırt edici alandır.

Ama birden fazla state varsa boolean yetersiz kalır.
Örneğin:
- idle
- loading
- success
- error

Bunu boolean ile modellemek zorlaşır:
```ts
type State = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};
```

Bu model invalid combination üretir:
```ts
const badState: State = {
  isLoading: true,
  isSuccess: true,
  isError: true,
};
```

Gerçekte bu mümkün olmamalıdır.
Daha iyi model:

```ts
type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; error: string };
```
Bu model invalid state'i temsil edilemez hale getirir.

## Invalid state'i temsil edilemez yapmak
Discriminated union'ın en büyük gücü budur:
>>> Yanlış state'i type seviyesinde imkansız hale getirmek.
Zayıf model:

```ts
type LoginState = {
  isLoading: boolean;
  user?: {
    id: string;
    email: string;
  };
  error?: string;
};
```

Bu object geçerli görünür:
```ts
const loginState: LoginState = {
  isLoading: true,
  user: {
    id: "u1",
    email: "user@example.com",
  },
  error: "Invalid password",
};
```

Ama bu mantıksal olarak hatalıdır. Discriminated union ile:

```ts
type User = {
  id: string;
  email: string;
};

type LoginState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "authenticated"; user: User }
  | { status: "unauthenticated"; error: string };
```

Artık authenticated state'te `user` gerekir.
Unauthenticated state'te `error` gerekir.
Loading state'te ikisi de yoktur.

Bu çok daha güvenlidir.

## switch ile narrowing
Discriminated union'larda `switch` çok okunaklıdır.

```ts
type PaymentStatus =
  | { status: "pending" }
  | { status: "paid"; paidAt: string }
  | { status: "failed"; reason: string };

function getPaymentMessage(payment: PaymentStatus): string {
  switch (payment.status) {
    case "pending":
      return "Payment is pending";

    case "paid":
      return `Payment paid at ${payment.paidAt}`;

    case "failed":
      return `Payment failed: ${payment.reason}`;
  }
}
```
Her `case` içinde TypeScript doğru shape'i bilir.

## Exhaustiveness checking

Discriminated union'larda önemli bir profesyonel pratik vardır: exhaustive check.

Amaç şudur:
>>> Union'a yeni bir case eklendiğinde, handle edilmeyen yerleri TypeScript bize göstersin.

Örnek:
```ts
type TaskState =
  | { status: "todo" }
  | { status: "in_progress" }
  | { status: "done" };
```

Function:
```ts
function getTaskLabel(task: TaskState): string {
  switch (task.status) {
    case "todo":
      return "To do";

    case "in_progress":
      return "In progress";

    case "done":
      return "Done";

    default: {
      const exhaustiveCheck: never = task;
      return exhaustiveCheck;
    }
  }
}
```

Buradaki `never`, "buraya gelmek imkansız olmalı" demektir.
Eğer ileride yeni bir state eklersek:
```ts
type TaskState =
  | { status: "todo" }
  | { status: "in_progress" }
  | { status: "done" }
  | { status: "blocked" };
```
Ama switch içinde `blocked` case'ini eklemezsek, TypeScript `default` içindeki `never` satırında hata verir.

Bu gerçek projelerde çok değerlidir.
Özellikle:
- payment status
- order status
- auth state
- API state
- security event
- permission result

gibi alanlarda eksik case'leri yakalamaya yardım eder.

## never mental model
`never`, TypeScript'te "asla oluşmaması gereken type" anlamına gelir.

Şu satır:
```ts
const exhaustiveCheck: never = task;
```

şunu söyler:
>>> Eğer buraya geldiysek, task artık hiçbir ihtimal olmamalı.

Ama handle edilmeyen bir union case varsa `task` hâlâ bir type'a sahiptir. O zaman TypeScript hata verir.
Bu başlangıçta biraz garip görünür ama büyük codebase'lerde güvenlik ağıdır.

## API result modelleme
Discriminated union, API result modellemek için çok uygundur.
```ts
type ApiSuccess<TData> = {
  status: "success";
  data: TData;
};

type ApiError = {
  status: "error";
  error: string;
};

type ApiResult<TData> = ApiSuccess<TData> | ApiError;
```

Burada generic syntax var ama şimdilik sadece fikre odaklan:
```ts
ApiResult<string>
```

şu anlama gelir:
>>> Ya success olup string data taşır, ya error olup error message taşır.

Daha basit hali:
```ts
type UserResult =
  | {
      status: "success";
      user: {
        id: string;
        email: string;
      };
    }
  | {
      status: "error";
      error: string;
    };
```

Kullanım:
```ts
function printUserResult(result: UserResult): void {
  if (result.status === "success") {
    console.log(result.user.email);
    return;
  }

  console.log(result.error);
}
```

## Auth state modelleme
Auth state için zayıf model:
```ts
type AuthState = {
  isLoading: boolean;
  user?: User;
  error?: string;
};
```
Bu modelde invalid combination mümkündür.

Daha güvenli model:
```ts
type AuthState =
  | { status: "checking" }
  | { status: "authenticated"; user: User }
  | { status: "anonymous" }
  | { status: "error"; error: string };
```

Bu model daha açıktır:
- checking: session kontrol ediliyor
- authenticated: user var
- anonymous: giriş yapılmamış
- error: auth kontrolünde hata olmuş

Bu, ileride React state yönetimi ve auth UI tarafında çok işimize yarar.

## Security result modelleme
Security ve authorization tarafında da discriminated union çok kullanışlıdır.

Zayıf model:
```ts
type PermissionCheck = {
  allowed: boolean;
  reason?: string;
};
```

Daha güvenli model:
```ts
type PermissionCheck =
  | {
      result: "allowed";
    }
  | {
      result: "denied";
      reason: "MISSING_ROLE" | "INSUFFICIENT_PERMISSION" | "ACCOUNT_DISABLED";
    };
```

Artık denied ise reason zorunludur. Allowed ise reason yoktur.

```ts
function logPermissionCheck(check: PermissionCheck): void {
  if (check.result === "allowed") {
    console.log("Permission granted");
    return;
  }

  console.log(`Permission denied: ${check.reason}`);
}
```

Bu yaklaşım AppSec ve RBAC konularında çok değerlidir.

## Discriminated union tasarlama kuralları

İyi bir discriminated union için:

1. Ortak bir discriminant field seç.
2. Field değerlerini literal union olarak kullan.
3. Her state'in sadece gerekli alanları taşımasını sağla.
4. Optional field'larla state modellemeye çalışma.
5. switch kullanıyorsan exhaustive check eklemeyi düşün.

İyi discriminant field isimleri:

```ts
status
type
kind
state
result
```

Örnekler:

```ts
type: "email_login"
type: "sso_login"

status: "loading"
status: "success"

kind: "admin_user"
kind: "regular_user"

result: "allowed"
result: "denied"
```

---

## Ne zaman kullanılır?

Discriminated union kullan:

- bir değer farklı state'lerden biri olabiliyorsa
- her state farklı field'lara sahipse
- optional property'ler invalid combination oluşturuyorsa
- UI state modelliyorsan
- API success/error sonucu modelliyorsan
- auth state modelliyorsan
- permission result modelliyorsan
- payment/order/task state modelliyorsan

Kullanman gerekmeyebilir:
- sadece basit string literal union yeterliyse
- her state aynı field'lara sahipse
- model zaten çok basitse

Örneğin sadece status alanı gerekiyorsa:
```ts
type TaskStatus = "todo" | "in_progress" | "done";
```

Bu yeterlidir. Ama her status farklı data taşıyorsa:

```ts
type TaskState =
  | { status: "todo" }
  | { status: "in_progress"; assignedTo: string }
  | { status: "done"; completedAt: string };
```

Discriminated union daha uygundur.

## Kısa özet

Discriminated union, object union'larını güvenli ve okunabilir modellemek için kullanılır.

Temel fikir:
```ts
type Result =
  | { status: "success"; data: string }
  | { status: "error"; error: string };
```
`status` ortak ayırt edici alandır.

Bu yapı sayesinde:
- TypeScript doğru branch içinde doğru field'lara izin verir
- invalid state'ler engellenir
- optional field karmaşası azalır
- switch ile okunabilir state handling yapılır
- exhaustive check ile eksik case'ler yakalanabilir

Gerçek projelerde bu konu özellikle API result, auth state, UI state, order/payment status, RBAC ve security decision modellerinde çok değerlidir.

