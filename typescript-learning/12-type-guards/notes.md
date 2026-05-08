# 12 - Type Guards

Daha önce union type ve unknown gördük.

Bazen bir değer birden fazla type olabilir:
type Value = string | number;

Bu durumda TypeScript, değeri doğrudan string veya number gibi kullanmamıza izin vermez.
Çünkü önce gerçek type'ı anlamamız gerekir.
Type guard, runtime'da kontrol yaparak TypeScript'e değerin hangi type olduğunu göstermemizi sağlar.

## 1. Type guard nedir?

Type guard, bir değerin type'ını kontrol eden if koşuludur.

function printValue(value: string | number) {
if (typeof value === "string") {
console.log(value.toUpperCase());
}
if (typeof value === "number") {
console.log(value + 10);
}
}

typeof value === "string" bir type guard'dır.
Bu kontrolün içinde TypeScript value'nun string olduğunu anlar.

## 2. Neden type guard gerekir?

Şu kod güvenli değildir:

function printValue(value: string | number) {
console.log(value.toUpperCase());
}

Çünkü value number olabilir. number üzerinde toUpperCase yoktur.
Bu yüzden önce kontrol yaparız:

if (typeof value === "string") {
console.log(value.toUpperCase());
}

Bu sayede sadece string olduğunda string method'u kullanılır.

## 3. typeof ile type guard

typeof primitive değerlerde kullanılır:

- string
- number
- boolean
- undefined

Example:

function printInput(input: string | number | boolean) {
if (typeof input === "string") {
console.log(input.toUpperCase());
}
if (typeof input === "number") {
console.log(input \* 2);
}
if (typeof input === "boolean") {
console.log(!input);
}
}

## 4. in operator ile object type guard

Object union'larında property kontrolü yapabiliriz.

type User = {
name: string;
};

type Admin = {
name: string;
permissions: string[];
};

function printPerson(person: User | Admin) {
if ("permissions" in person) {
console.log(person.permissions);
} else {
console.log(person.name);
}
}

"permissions" in person TypeScript'e person'ın Admin olduğunu gösterir.
Çünkü permissions property’si sadece Admin içinde vardır.

## 5. Literal property ile type guard

Object'lerde ayırt edici bir property kullanabiliriz.

type SuccessResult = {
status: "success";
data: string;
};

type ErrorResult = {
status: "error";
message: string;
};

type Result = SuccessResult | ErrorResult;

function handleResult(result: Result) {
if (result.status === "success") {
console.log(result.data);
}
if (result.status === "error") {
console.log(result.message);
}
}

Burada status property’si hangi object type ile çalıştığımızı anlamamızı sağlar.
Bu yapı gerçek projelerde çok yaygındır.

## 6. unknown ile type guard

unknown kullanırken değeri kullanmadan önce kontrol etmek gerekir.

function printUnknown(value: unknown) {
if (typeof value === "string") {
console.log(value.toUpperCase());
}
}

Burada value başlangıçta unknown'dır.
Ama if bloğu içinde TypeScript value'nun string olduğunu anlar.

## 7. Type guard vs type assertion

Type assertion:
const text = value as string;
TypeScript'e "bana güven" der.

Type guard:
if (typeof value === "string") {
console.log(value.toUpperCase());
}

Gerçek runtime kontrolü yapar. Bu yüzden çoğu durumda type guard daha güvenlidir.

## Kısa özet

Type guard, bir değerin type'ını kontrol ederek güvenli kullanım sağlar. En yaygın type guard örnekleri:

typeof value === "string"
typeof value === "number"
"propertyName" in object
result.status === "success"

Type guard özellikle union type ve unknown ile çok kullanılır.
