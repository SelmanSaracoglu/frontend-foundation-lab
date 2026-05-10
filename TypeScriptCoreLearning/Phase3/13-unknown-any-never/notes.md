# 12 - unknown, any, never
Bu milestone’da TypeScript’te üç özel tipi öğreneceğiz:
- `any`
- `unknown`
- `never`

Bu üç tip, özellikle gerçek projelerde dış dünyadan gelen veriyle çalışırken çok önemlidir.

Örnek riskli veri kaynakları:
- API response
- JSON.parse sonucu
- localStorage/sessionStorage
- form input
- URL parametreleri
- third-party SDK dönüşleri
- beklenmeyen hata objeleri

TypeScript sadece compile-time’da çalışır. Yani kod çalışmadan önce bize yardım eder. Ama API’den gelen verinin gerçekten doğru olup olmadığını otomatik olarak garanti edemez.

Bu yüzden dış dünyadan gelen veri için şu zihniyet gerekir:
>>> “Bu veri beklediğim shape’e benziyor olabilir, ama doğrulamadan güvenmemeliyim.”

---

# `any`

`any`, TypeScript’e şunu söyler:
>>> “Bu değeri kontrol etme. Ben ne yaptığımı biliyorum.”
Ama çoğu zaman bu tehlikelidir.
```ts
let value: any = "hello";

value.toUpperCase(); 
value.toFixed(2);
value.user.profile.email;
```

TypeScript bunlara hata vermez. Ama runtime’da kod patlayabilir.
```ts
value.toFixed(2);
```
`value` string olduğu için bu satır çalışırken hata verir.

## `any` neden tehlikeli?
Çünkü TypeScript’in güvenlik sistemini devre dışı bırakır.

`any` kullanılan yerde:
- olmayan property’ye erişebilirsin
- yanlış method çağırabilirsin
- yanlış tipte değer gönderebilirsin
- hatalar compile-time yerine runtime’da çıkar

Gerçek projelerde bu özellikle API ve user input tarafında tehlikelidir.

Kötü örnek:
```ts
function printUserEmail(user: any) {
  console.log(user.email.toLowerCase());
}
```

Bu fonksiyon şunları kontrol etmez:
- `user` gerçekten object mi?
- `email` var mı?
- `email` gerçekten string mi?

# `unknown`

`unknown`, TypeScript’e şunu söyler:
>>> “Bu değerin ne olduğunu henüz bilmiyorum. Kullanmadan önce kontrol etmelisin.”
Bu yüzden `unknown`, `any`’den daha güvenlidir.
```ts
let value: unknown = "hello";

value.toUpperCase(); // hata
```

TypeScript burada bizi durdurur. Önce narrowing yapmamız gerekir:
```ts
if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

Burada TypeScript artık `value` değişkeninin string olduğunu bilir.

## `unknown` ne zaman kullanılır?
Dış dünyadan gelen veri için idealdir.
```ts
const rawData: unknown = JSON.parse('{"id":1,"email":"a@test.com"}');
```
Bu veri JSON’dan geldiği için TypeScript açısından güvenilir değildir.

Şunu yapmamalıyız:
```ts
const user = rawData as User;
```
Bu sadece TypeScript’i susturur. Runtime doğrulama yapmaz.

Daha güvenli yaklaşım:
```ts
if (isUser(rawData)) {
  console.log(rawData.email);
}
```
Custom type guard konusunu bir sonraki milestone’da detaylı işleyeceğiz.

# Compile-time type vs runtime data

TypeScript tipleri runtime’da yoktur. Şu interface çalışma zamanında veri doğrulamaz:

```ts
interface User {
  id: number;
  email: string;
}
```

Bu sadece geliştirme sırasında TypeScript’e bilgi verir. Yani şu kod güvenli değildir:
```ts
const user = JSON.parse(input) as User;
```
Çünkü `as User` sadece TypeScript’e “bana güven” demektir.

Ama gerçek veri şu olabilir:
```json
{
  "id": "not-a-number",
  "email": null
}
```
TypeScript bunu otomatik yakalayamaz.

Bu yüzden güvenilmeyen veri için:
1. Önce `unknown` kabul et
2. Sonra runtime kontrol yap
3. Sonra güvenli tipe daralt

---

# `never`
`never`, “bu noktaya asla ulaşılamaz” anlamına gelir.

Genelde üç yerde karşımıza çıkar:
## 1. Fonksiyon hiçbir zaman normal dönmezse

```ts
function fail(message: string): never {
  throw new Error(message);
}
```
Bu fonksiyon değer döndürmez. Her zaman hata fırlatır.

## 2. Sonsuz döngü
```ts
function runForever(): never {
  while (true) {
    console.log("running");
  }
}
```
Bu fonksiyon da normal şekilde bitmez.

## 3. Exhaustive checking
Discriminated union’larda bütün case’leri ele aldığımızdan emin olmak için kullanılır.

```ts
type PaymentStatus =
  | "pending"
  | "paid"
  | "failed";

function getStatusLabel(status: PaymentStatus): string {
  switch (status) {
    case "pending":
      return "Payment is pending";
    case "paid":
      return "Payment completed";
    case "failed":
      return "Payment failed";
    default:
      const unreachable: never = status;
      return unreachable;
  }
}
```

Eğer ileride tipe yeni bir seçenek eklersek:
```ts
type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded";
```

Ama switch içinde `refunded` case’ini unutursak TypeScript hata verir. Bu gerçek projelerde çok değerlidir. Özellikle:

- status handling
- role handling
- permission handling
- API result handling
- reducer/action handling

gibi yapılarda eksik case unutmayı engeller.

# Kısa özet

- `any`, TypeScript’in kontrolünü kapatır.
- `unknown`, güvenilmeyen veri için daha güvenlidir.
- `unknown` kullanırken önce kontrol yapmalıyız.
- TypeScript tipleri runtime’da veri doğrulamaz.
- API, JSON ve user input gibi kaynaklara doğrudan güvenmemeliyiz.
- `never`, ulaşılamayan kodu ve eksik union case’lerini yakalamak için kullanılır.

