# 15 - keyof Basics

keyof, bir type'ın property adlarından union type üretir.

## 1. keyof nedir?

type User = {
  name: string;
  age: number;
};

type UserKey = keyof User;

UserKey şu type'a eşittir: "name" | "age"

let key: UserKey = "name"; --> dogru
let key: UserKey = "email"; --> hatalıdır.

Çünkü User type içinde email property’si yoktur.

## 2. keyof neden var?

Normal string kullanırsak hata yapabiliriz.

function printValue(user: User, key: string) {
  console.log(user[key]);
}

Burada key herhangi bir string olabilir:
"name"
"age"
"email"
"wrongKey"
Ama User içinde sadece name ve age vardır. keyof ile key'i güvenli hale getiririz:

function printValue(user: User, key: keyof User) {
  console.log(user[key]);
}

Artık key sadece "name" veya "age" olabilir.

## 3. keyof ile property okumak

type Product = {
  title: string;
  price: number;
};

function printProductValue(product: Product, key: keyof Product) {
  console.log(product[key]);
}

const product: Product = {
  title: "Keyboard",
  price: 120,
};

printProductValue(product, "title");
printProductValue(product, "price");

Bu hatalı olur:
printProductValue(product, "category");
Çünkü category, Product içinde yoktur.

## 4. keyof ve generics birlikte

keyof genelde generic ile daha güçlü olur.

function getValue<T, K extends keyof T>(item: T, key: K) {
  return item[key];
}

T = object type
K = T object'inin geçerli keylerinden biri

K extends keyof T şu anlama gelir:
K, T'nin property adlarından biri olmak zorunda.

const user = {
  name: "Ada",
  age: 28,
};

const name = getValue(user, "name");
const age = getValue(user, "age");

Bu hatalıdır:
getValue(user, "email");
Çünkü email user içinde yoktur.

## 5. getValue return type

Şu function'a bakalım:

function getValue<T, K extends keyof T>(item: T, key: K): T[K] {
  return item[key];
}

Return type:
T[K]

şu anlama gelir:
T object'inde K key'inin value type'ı neyse, function onu döndürür.

Örneğin:
const name = getValue(user, "name");
name string olur.
const age = getValue(user, "age");
age number olur.

---

## Kısa özet

keyof, bir object type'ın property adlarından union type üretir. 

type UserKey = keyof User;
Eğer User:

{
  name: string;
  age: number;
}

ise UserKey:
"name" | "age"
olur.

Generic ile yaygın kullanım:

function getValue<T, K extends keyof T>(item: T, key: K): T[K] {
  return item[key];
}

Bu yapı object property okumayı type-safe hale getirir.