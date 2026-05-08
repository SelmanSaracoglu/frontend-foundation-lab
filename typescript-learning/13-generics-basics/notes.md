# 13 - Generics Basics

Bazen bir function'ın farklı type'larla çalışmasını isteriz.
Ama bunu yaparken type bilgisini kaybetmek istemeyiz.

function identity(value) {
return value;
}

Bu function verilen değeri geri döndürür.
Eğer string verirsek string döner.
Eğer number verirsek number döner.
TypeScript'te bunu güvenli şekilde yazmak için generic kullanırız.

## 1. Problem

Şu function sadece string ile çalışır:
function returnString(value: string) {
return value;
}

Şu function sadece number ile çalışır:
function returnNumber(value: number) {
return value;
}

Ama ikisi de aynı işi yapıyor:
Gelen değeri geri döndürüyor.
Aynı mantığı tekrar etmek istemeyiz.

## 2. any ile çözmek neden iyi değil?

function returnValue(value: any) {
return value;
}

Bu her type ile çalışır. Ama sorun şu:
Type bilgisi kaybolur.

const result = returnValue("hello");
Burada result any olur.

TypeScript artık result'ın string olduğunu güvenli şekilde takip edemez.

## 3. Generic nedir?

Generic, function'a type'ı dışarıdan vermemizi sağlar.

function returnValue<T>(value: T): T {
return value;
}

Buradaki T bir type değişkenidir. Şöyle okunabilir:
Bu function hangi type ile çağrılırsa, value o type olur ve return değeri de aynı type olur.

const text = returnValue("hello");
TypeScript burada T'nin string olduğunu anlar.

const score = returnValue(100);
Burada T number olur.

## 4. T ne anlama gelir?

T özel bir keyword değildir. Sadece yaygın kullanılan bir isimdir.
T genelde "Type" anlamında kullanılır.

Şu da çalışır:

function returnValue<ValueType>(value: ValueType): ValueType {
return value;
}

Ama başlangıçta T kullanmak yaygındır.

## 5. Generic function neden faydalı?

Generic ile:

- Farklı type'larla çalışan function yazabiliriz
- any kullanmadan type bilgisini koruruz
- input ve output arasındaki ilişkiyi TypeScript'e anlatırız

function getFirstItem<T>(items: T[]): T {
return items[0];
}

const firstNumber = getFirstItem([10, 20, 30]);
const firstName = getFirstItem(["Ada", "Elif"]);

firstNumber number olur.
firstName string olur.

## 6. Generic array örneği

Şu function array'in ilk elemanını döndürür:

function getFirstItem<T>(items: T[]): T {
return items[0];
}

T[] = T type'ındaki değerlerden oluşan array
T = function'ın döndürdüğü type

Eğer number[] verirsek T number olur.
Eğer string[] verirsek T string olur.

## 7. Generic type alias

Generic sadece functionlarda kullanılmaz.
Type alias içinde de kullanılabilir.

type ApiResponse<T> = {
data: T;
success: boolean;
};

type User = {
name: string;
};

const response: ApiResponse<User> = {
data: {
name: "Ada",
},
success: true,
};

Burada ApiResponse farklı data type'ları ile tekrar kullanılabilir.

## 8. Ne zaman generic kullanılır?

Generic kullanmak mantıklıdır:

- Function farklı type'larla aynı mantıkta çalışıyorsa
- Input type ile output type arasında ilişki varsa
- Reusable wrapper type yazıyorsak

function returnValue<T>(value: T): T

function getFirstItem<T>(items: T[]): T

type ApiResponse<T> = {
data: T;
success: boolean;
};

Başlangıç için en önemli fikir: Generic, any kullanmadan esnek kod yazmamızı sağlar.

## Kısa özet

Generic, type bilgisini dışarıdan alan yapıdır.
Basic syntax:

function returnValue<T>(value: T): T {
return value;
}

T, çağrı sırasında TypeScript tarafından çıkarılır.
returnValue("hello") -> T string olur
returnValue(100) -> T number olur
Generic, type güvenliğini kaybetmeden reusable function ve type yazmamızı sağlar.
