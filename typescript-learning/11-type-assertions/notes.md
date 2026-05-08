# 11 - Type Assertions

## Bu konunun amacı

Bazen TypeScript bir değerin type'ını bizim kadar net bilemeyebilir.

Örneğin dışarıdan gelen bir değerin string olduğunu biz biliyor olabiliriz ama TypeScript bunu unknown olarak görüyor olabilir.

Bu durumda type assertion kullanabiliriz.

Type assertion, TypeScript'e şunu söylemektir:

"Bu değerin type'ını ben biliyorum."

Ama önemli:

Type assertion runtime'da kontrol yapmaz.
Sadece TypeScript'e bilgi verir.

---

## 1. Type assertion nedir?

Örnek:

let value: unknown = "hello";

const text = value as string;

console.log(text.toUpperCase());

Burada value unknown'dır.

Normalde TypeScript şuna izin vermez:

value.toUpperCase();

Çünkü value'nun gerçekten string olup olmadığını bilmez.

Ama şu satırda:

const text = value as string;

TypeScript'e şunu söylüyoruz:

"Bu value değerini string olarak kabul et."

Bundan sonra text üzerinde string methodlarını kullanabiliriz.

---

## 2. Type assertion neden dikkatli kullanılmalı?

Type assertion TypeScript'i ikna eder ama veriyi gerçekten değiştirmez.

Örnek:

let value: unknown = 42;

const text = value as string;

console.log(text.toUpperCase());

TypeScript bu koda izin verebilir.

Ama runtime'da hata olur.

Çünkü value gerçekte number'dır.

Yani:

as string

değeri string'e dönüştürmez.

Sadece TypeScript'e string gibi davranmasını söyler.

---

## 3. Assertion ile conversion farkı

Bu çok önemli bir farktır.

Assertion:

const text = value as string;

Bu değer dönüştürmez.

Conversion:

const text = String(value);

Bu gerçekten string'e çevirir.

Örnek:

const value = 42;

const asserted = value as unknown as string;
const converted = String(value);

asserted runtime'da hâlâ number değerinden gelir.
converted ise gerçekten "42" string olur.

Başlangıçta şunu bilmek yeterli:

as string type dönüşümü değildir.
Sadece TypeScript'e verilen bir bilgidir.

---

## 4. Ne zaman type assertion kullanılır?

Type assertion bazen gereklidir:

- DOM elementleriyle çalışırken
- unknown gelen bir veriyi kontrol ettikten sonra
- TypeScript'in eksik çıkarım yaptığı durumlarda
- Dış library'lerden gelen verilerde

Ama mümkünse önce type narrowing tercih edilir.

Daha güvenli kullanım:

let value: unknown = "hello";

if (typeof value === "string") {
  console.log(value.toUpperCase());
}

Daha riskli kullanım:

let value: unknown = "hello";

const text = value as string;
console.log(text.toUpperCase());

Narrowing gerçekten kontrol yapar.
Assertion ise bizim iddiamıza güvenir.

---

## 5. Object ile type assertion

Örnek:

type User = {
  name: string;
  age: number;
};

const data: unknown = {
  name: "Ada",
  age: 28,
};

const user = data as User;

console.log(user.name);
console.log(user.age);

Burada TypeScript'e data'nın User olduğunu söylüyoruz.

Ama TypeScript runtime'da object'in gerçekten User olup olmadığını kontrol etmez.

Bu yüzden data yanlış shape'e sahipse hata çıkabilir.

---

## 6. Pratik kural

Önce narrowing düşün.

Örnek:

if (typeof value === "string") {
  console.log(value.toUpperCase());
}

Eğer TypeScript'e güvenli şekilde açıklayamadığın ama gerçekten bildiğin bir durum varsa assertion kullan.

Örnek:

const user = data as User;

Ama şunu unutma:

Type assertion sorumluluğu geliştiriciye verir.

Yanlış assertion runtime hatasına yol açabilir.

---

## Kısa özet

Type assertion, TypeScript'e bir değerin type'ını bizim bildiğimizi söylemektir.

Syntax:

const text = value as string;

Bu runtime'da değer dönüştürmez.

Yanlış kullanım:

const text = 42 as unknown as string;

Bu number'ı string yapmaz.

Daha güvenli yaklaşım:

Önce type narrowing kullan.
Gerektiğinde type assertion kullan.