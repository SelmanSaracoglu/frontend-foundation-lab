# 10 - any vs unknown

TypeScript bize type güvenliği sağlar. Ama bazen elimizdeki verinin type'ını bilmiyor olabiliriz.

- API'den gelen veri
- localStorage'dan okunan veri
- JSON parse sonucu
- dış bir library'den gelen veri

Bu gibi durumlarda TypeScript'te iki önemli type karşımıza çıkar:

any
unknown

## 1. any nedir?

any, TypeScript'e şunu söyler: "Bu değeri kontrol etme."

let value: any = "hello";
console.log(value.toUpperCase());

Ama any tehlikelidir çünkü TypeScript artık bizi korumaz.
let value: any = 42;
console.log(value.toUpperCase());

TypeScript buna izin verir. Ama runtime'da hata alırız çünkü number üzerinde toUpperCase yoktur.
Yani any, TypeScript'in type güvenliğini kapatır.

## 2. unknown nedir?

unknown da "type'ını bilmiyorum" demektir.
Ama any'den farklı olarak TypeScript bizi korumaya devam eder.

let value: unknown = "hello";
console.log(value.toUpperCase());
Bu hata verir.

Çünkü TypeScript şunu der:
"Bu value gerçekten string mi bilmiyorum. Önce kontrol et."

Doğru kullanım:
if (typeof value === "string") {
console.log(value.toUpperCase());
}
Burada typeof kontrolü yaptığımız için TypeScript value'nun string olduğunu anlar.

## 4. Neden unknown daha güvenlidir?

unknown bize şunu hatırlatır:
"Bu veriye güvenme. Önce kontrol et."
Özellikle dışarıdan gelen verilerde bu önemlidir.

function printValue(value: unknown) {
if (typeof value === "string") {
console.log(value.toUpperCase());
}
if (typeof value === "number") {
console.log(value + 10);
}
}

Bu function farklı type'lardaki verilerle güvenli şekilde çalışır.

## 5. Ne zaman any kullanılır?

Başlangıçta mümkün olduğunca any kullanmamak daha iyidir.
any bazen geçici olarak kullanılabilir:

- Eski JavaScript kodunu TypeScript'e taşırken
- Type'ı henüz yazılmamış bir library ile çalışırken
- Hızlı deneme yaparken

Ama uzun vadede any azaltılmalıdır.
Çünkü any kullanınca TypeScript'in en büyük faydası kaybolur.

## 6. Ne zaman unknown kullanılır?

Bir değerin type'ını gerçekten bilmiyorsak unknown daha doğru seçimdir.

Örnek durumlar:

- API response
- JSON.parse sonucu
- user input
- dış sistemden gelen data

function handleInput(input: unknown) {
if (typeof input === "string") {
console.log(input.toUpperCase());
}
}

Burada function herhangi bir input alabilir. Ama input'u kullanmadan önce type kontrolü yapılır.
