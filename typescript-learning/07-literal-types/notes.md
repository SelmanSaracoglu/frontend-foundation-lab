# 08 - Literal Types

## 1. String literal type nedir?

**Normal string type:**
let role: string = "admin";

Bu değişken daha sonra başka herhangi bir string değer alabilir:

role = "user";
role = "guest";
role = "anything";

Çünkü type string'dir.

**String literal type:**
let role: "admin" = "admin";
Burada role değişkeni sadece "admin" değerini alabilir.

Bu hatalıdır: role = "user";
Çünkü role type'ı string değildir. role type'ı sadece "admin" değeridir.

## 2. Literal type neden var?

Literal type, bir değeri kontrollü hale getirmek için vardır. Bazı değişkenler her string'i almamalıdır.
Örneğin bir request status düşünelim. Mantıklı değerler şunlar olabilir:

"loading"
"success"
"error"

Ama normal string kullanırsak:
let status: string = "loading";

Sonra yanlışlıkla şunu yazabiliriz:
status = "succes";
Burada "success" yanlış yazıldı. Ama TypeScript bunu yakalayamaz çünkü "succes" da bir string'dir.

Literal union kullanırsak:
type Status = "loading" | "success" | "error";
let status: Status = "loading";

status = "success"; // doğru
status = "succes"; // hata

Bu sayede TypeScript izin verilen değerler dışına çıkmamızı engeller.

## 3. Literal type ile union type birlikte çok güçlüdür

Tek başına literal type çok dar olabilir:
let status: "loading" = "loading";

Bu değişken sadece "loading" olabilir. Ama gerçek hayatta status farklı durumlara geçebilir:
"loading"
"success"
"error"

Bunu union type ile yazarız:
type Status = "loading" | "success" | "error";

Bu şu anlama gelir:
Status type'ındaki bir değer sadece şu üç değerden biri olabilir:

- "loading"
- "success"
- "error"

Örnek:
let currentStatus: Status = "loading";
currentStatus = "success";
currentStatus = "error";

Ama şunlar hatalıdır:
currentStatus = "done";
currentStatus = "failed";
currentStatus = "succes";

## 4. Literal type ile function parameter kullanımı

Bir function'ın sadece belirli değerleri kabul etmesini isteyebiliriz.

type Direction = "left" | "right" | "up" | "down";

function move(direction: Direction) {
console.log(direction);
}

Bu doğru:
move("left");
move("up");

Bu hatalıdır:
move("forward");

Burada function daha güvenli hale gelir.

## 5. Literal type ile object property kullanımı

Literal type object property'lerinde de kullanılabilir.

type Button = {
label: string;
variant: "primary" | "secondary" | "danger";
};

const saveButton: Button = {
label: "Save",
variant: "primary",
};

Burada label herhangi bir string olabilir. Ama variant sadece yukaridaki değerlerden biri olabilir.

Bu doğru:
const deleteButton: Button = {
label: "Delete",
variant: "danger",
};

Bu hatalıdır:
const wrongButton: Button = {
label: "Cancel",
variant: "warning",
};

## 6. Literal type ile type narrowing bağlantısı

Daha önce union types konusunda type narrowing gördük. Literal types, narrowing için çok kullanışlıdır.

type Status = "loading" | "success" | "error";

function printStatus(status: Status) {
if (status === "loading") {
console.log("Loading...");
}
if (status === "success") {
console.log("Success!");
}
if (status === "error") {
console.log("Something went wrong.");
}
}

Burada TypeScript, her if bloğunda status değerinin hangi literal olduğunu anlayabilir.
if (status === "loading")
bloğunda status artık "loading" olarak daraltılır.
Bu, type narrowing'in literal type ile kullanımına örnektir.

## Literal type ve reusable type alias

Literal union'ları genelde type alias ile isimlendiririz. Kötü olmayan ama tekrar eden kullanım:

function setStatus(status: "loading" | "success" | "error") {
console.log(status);
}
function showStatus(status: "loading" | "success" | "error") {
console.log(status);
}

Burada aynı union tekrar tekrar yazılmıştır. Daha iyi kullanım:
type Status = "loading" | "success" | "error";

function setStatus(status: Status) {
console.log(status);
}
function showStatus(status: Status) {
console.log(status);
}

Artık Status tek yerde tanımlıdır. Yeni bir status eklemek istersek:
type Status = "loading" | "success" | "error" | "idle";
tek yerden değiştirebiliriz.

## Literal type ile typo hatalarını yakalamak

Literal types gerçek projelerde typo hatalarını önlemeye yardım eder.

type Theme = "light" | "dark";
let theme: Theme = "light";

theme = "dark"; // doğru
theme = "drak"; // hata

Bu özellikle şu alanlarda çok kullanılır:

- status değerleri
- role değerleri
- theme değerleri
- button variant değerleri
- route/action isimleri
- permission değerleri

## 12. Ne zaman literal type kullanmalıyız?

Literal type kullanmak mantıklıdır:

- Değerler belli bir seçenek listesine sahipse
- Yanlış string yazımlarını engellemek istiyorsak
- Function'ın sadece belirli değerleri kabul etmesini istiyorsak
- Object property'nin kontrollü olmasını istiyorsak

Örnekler:
type Status = "loading" | "success" | "error";
type Role = "admin" | "user" | "guest";
type Theme = "light" | "dark";
type ButtonVariant = "primary" | "secondary" | "danger";
type Direction = "left" | "right" | "up" | "down";

Kullanmamak daha iyi olabilir:

- Değer gerçekten herhangi bir string olabilir
- Kullanıcıdan serbest metin alıyorsak
- Seçenek listesi belli değilse

Örneğin:

type User = {
name: string;
};

Burada name için literal type mantıklı değildir.
Çünkü kullanıcı adı herhangi bir string olabilir.

## Kısa özet

Literal type, belirli bir değeri type olarak kullanmamızı sağlar. Normal string çok geniştir.
Literal union ise izin verilen değerleri sınırlar.
Bu sayede yanlış değerler ve typo hataları daha kod çalışmadan yakalanır.
