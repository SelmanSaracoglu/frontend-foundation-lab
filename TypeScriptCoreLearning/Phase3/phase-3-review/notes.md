# Phase 3 Review - Safe TypeScript

## Amaç

Phase 3’te TypeScript’i daha güvenli kullanmayı öğrendik.

Ana fikir şuydu:

> Dış dünyadan gelen veriye doğrudan güvenme.

Dış dünya kaynakları:

- API response
- JSON.parse sonucu
- user input
- localStorage
- URL params
- third-party SDK
- async işlemler
- beklenen hata durumları

---

# Phase 3’ün ana modeli

Güvenli akış genelde şöyledir:

```ts
unknown data
→ runtime check
→ type guard
→ typed result
→ async handling
```

Yani:

1. Dış veriyi `unknown` kabul et.
2. Shape kontrolü yap.
3. Type guard ile güvenli tipe daralt.
4. Başarı/hata durumunu `Result<T>` ile modelle.
5. Async işlemlerde `Promise<Result<T>>` kullan.

---

# any yerine unknown

`any` TypeScript’i susturur.

```ts
const data: any = JSON.parse(input);
console.log(data.user.email.toLowerCase());
```

Bu kod compile-time’da güvenli görünür ama runtime’da patlayabilir.

Daha iyi yaklaşım:

```ts
const data: unknown = JSON.parse(input);
```

`unknown`, bizi kontrol yapmaya zorlar.

---

# Type guard

Type guard, runtime kontrol ile TypeScript narrowing’i birleştirir.

```ts
function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "id" in value &&
    typeof value.id === "number" &&
    "email" in value &&
    typeof value.email === "string"
  );
}
```

Bu fonksiyon `true` dönerse TypeScript artık değeri `User` kabul eder.

---

# Result modeli

Beklenen hata durumlarını type seviyesinde görünür yapar.

```ts
type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: AppError;
    };
```

Bu sayede kullanıcı kodu hata durumunu ele almak zorunda kalır.

---

# Async Result

Gerçek projelerde çoğu işlem async’tir.

```ts
async function getUser(): Promise<Result<User>> {
  // ...
}
```

Bu şu anlama gelir:

> “Bu işlem async çalışır. Bitince ya User döner ya da typed error döner.”

---

# Phase 3 sonucu

Artık şu alışkanlıkları kazanmış olmalısın:

- API verisini doğrudan güvenilir kabul etmeme
- `any` yerine `unknown` kullanma
- runtime check yapma
- custom type guard yazma
- beklenen hataları `Result<T>` ile modelleme
- async işlemlerde `Promise<Result<T>>` okuyabilme
- hata mesajlarında gereksiz bilgi sızdırmamaya dikkat etme

Bu foundation, ileride Node/Express API, auth, RBAC, API testing ve AppSec konularında çok işimize yarayacak.

