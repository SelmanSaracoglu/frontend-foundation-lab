# 14 - Generic Constraints

Bir önceki konuda generic öğrendik. Generic sayesinde farklı type'larla çalışan reusable function yazabiliyorduk.

function returnValue<T>(value: T): T {
return value;
}

Ama bazen generic function tamamen serbest olmamalıdır. Bazı durumlarda function'a gelen değerin belirli property'lere sahip olmasını isteriz. Generic constraint bunun için vardır.

## 1. Problem

Şu function bir object'in id değerini yazdırmak istiyor:

function printId<T>(item: T) {
console.log(item.id);
}

Ama TypeScript hata verir. Çünkü T herhangi bir şey olabilir:

string
number
boolean
object

TypeScript şunu düşünür:
"T her şey olabilir. Her şeyde id property yoktur." Bu yüzden item.id güvenli değildir.

## 2. Constraint nedir?

Constraint, generic type'a sınır koymaktır.

Yani TypeScript'e şunu söyleriz:
"T herhangi bir şey olabilir ama mutlaka id property’si olmalı."

function printId<T extends { id: number }>(item: T) {
console.log(item.id);
}

T extends { id: number } şu anlama gelir:
T, en azından id: number property’sine sahip olmalıdır.

## 3. Constraint neden faydalı?

Constraint sayesinde function hâlâ esnektir. Ama tamamen kontrolsüz değildir.

function printId<T extends { id: number }>(item: T) {
console.log(item.id);
}

Bu geçerlidir: printId({ id: 1, name: "Ada" });
Bu da geçerlidir: printId({ id: 2, title: "Keyboard", price: 120 });
Çünkü ikisinde de id vardır.

Ama bu hatalıdır: printId({ name: "Ada" });
Çünkü id yoktur.

## 4. Constraint ile property kullanmak

Bir property'yi function içinde kullanmak istiyorsak, constraint ile o property'nin var olduğunu garanti ederiz.

function printName<T extends { name: string }>(item: T) {
console.log(item.name);
}

Bu function'a gelen değer en azından name: string içermelidir. Başka property'ler olabilir.

Bu doğrudur: printName({ name: "Ada", age: 28 });
Çünkü name vardır.

## 5. Constraint input type'ı tamamen değiştirmez

T extends { id: number } demek, T sadece { id: number } olacak demek değildir.
T daha büyük bir object olabilir.

const user = {
id: 1,
name: "Ada",
age: 28,
};

printId(user);

Burada T şu object shape olabilir:

{
id: number;
name: string;
age: number;
}

Constraint sadece şunu söyler: "Bu object'in içinde id kesin olmalı."

## 6. Generic constraint ve return type

Constraint, type bilgisini korur.

function returnItem<T extends { id: number }>(item: T): T {
return item;
}

const user = returnItem({
id: 1,
name: "Ada",
age: 28,
});

Burada user hâlâ name ve age bilgisine sahiptir. Çünkü return type T'dir.
Yani constraint sadece minimum şartı belirler. Geri kalan type bilgisi kaybolmaz.

## 7. Array ile generic constraint

Object array içinde de kullanılabilir.

function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
return items.find((item) => item.id === id);
}

Burada items içindeki her elemanın id: number property’si olmalıdır.
Return type: T | undefined

Çünkü aranan item bulunamayabilir.

## Kısa özet

Generic constraint, generic type'a minimum şart koyar.

function printId<T extends { id: number }>(item: T) {
console.log(item.id);
}

Bu şu anlama gelir:
T herhangi bir object olabilir ama içinde id: number olmalıdır.

Constraint sayesinde:

- Generic function esnek kalır
- Function içinde belirli property'leri güvenli kullanabiliriz
- Return type ile orijinal type bilgisi korunur

