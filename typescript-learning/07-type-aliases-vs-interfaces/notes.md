# 07 - Type Aliases vs Interfaces

## 1. Type alias nedir? --> Type alias, bir type'a isim vermektir.

type User = {
name: string;
age: number;
};

Sonra bunu tekrar kullanabiliriz:

const user: User = {
name: "Ada",
age: 28,
};

Functionlarda da kullanabiliriz:

function printUser(user: User) {
console.log(user.name);
console.log(user.age);
}

Type alias String literal union için de kullanabiliriz:

type Status = "success" | "error" | "loading";

Bu yüzden type alias daha genel bir araçtır.

## 2. Interface nedir? --> Interface, genelde object shape tanımlamak için kullanılır.

interface Product {
title: string;
price: number;
}

Bu şu anlama gelir:
Product adında bir object shape tanımladık.
Bu shape'e göre Product object'inde title ve price olmalıdır.

const product: Product = {
title: "Keyboard",
price: 120,
};

## 3. Type ve interface object için benzer görünür, İkisi de object shape tanımlar.

type User = {
name: string;
age: number;
};

interface User {
name: string;
age: number;
}

Bu yüzden başlangıç seviyesinde şu şekilde düşünebiliriz:

- Object shape tanımlamak için type kullanılabilir
- Object shape tanımlamak için interface kullanılabilir

İkisiyle de şunu yapabiliriz:

const user: User = {
name: "Ada",
age: 28,
};

## 4. Peki neden iki farklı şey var?

TypeScript'te type alias daha genel amaçlıdır. Type alias ile şunları yapabiliriz:

type User = {
name: string;
age: number;
};

type Status = "success" | "error" | "loading";

type ID = string | number;

Yani type alias:

- object shape'e isim verebilir
- union type'a isim verebilir
- primitive type birleşimlerine isim verebilir

Interface ise en çok object shape tanımlamak için kullanılır.
Interface özellikle class ve object yapılarıyla birlikte sık kullanılır.

interface User {
name: string;
age: number;
}

## 5. Basit kural: Başlangıç için şu kural yeterlidir. Object shape tanımlıyorsak:

type User = {
name: string;
age: number;
};

veya:

interface User {
name: string;
age: number;
}

Union type tanımlıyorsak type kullanırız:
type Status = "success" | "error" | "loading";
Bunu interface ile yazamayız.

## 7. Function parameter olarak kullanmak

Type alias:
type User = {
name: string;
age: number;
};

function printUser(user: User) {
console.log(user.name);
console.log(user.age);
}

Interface:
interface Product {
title: string;
price: number;
}

function printProduct(product: Product) {
console.log(product.title);
console.log(product.price);
}

İkisinde de function'a gelecek object'in shape'i tanımlanır.

## 8. Arrays ile kullanmak

Type alias:
type User = {
name: string;
age: number;
};

const users: User[] = [
{ name: "Ada", age: 28 },
{ name: "Elif", age: 25 },
];

Interface:
interface Product {
title: string;
price: number;
}

const products: Product[] = [
{ title: "Keyboard", price: 120 },
{ title: "Mouse", price: 80 },
];

İkisinde de array içindeki object'lerin nasıl görünmesi gerektiğini belirtiriz.

## 9. Extension fikrine giriş: Interface başka bir interface'i genişletebilir.

interface User {
name: string;
}

interface AdminUser extends User {
role: string;
}

Burada AdminUser şunlara sahip olmalıdır:

{
name: string;
role: string;
}

Çünkü AdminUser, User interface'ini extend eder.
Yani User'dan name gelir, AdminUser kendi role property’sini ekler.
Bu fikir gerçek projelerde sık kullanılır.

## 10. Type ile benzer genişletme: Type alias ile de benzer bir şey yapılabilir.

type User = {
name: string;
};

type AdminUser = User & {
role: string;
};

Burada & işareti intersection anlamına gelir. Şu aşamada sadece şöyle düşünmek yeterli:
AdminUser, User'ın property'lerini alır ve role ekler.
Yani AdminUser şuna benzer:

{
name: string;
role: string;
}

## 11. Ne zaman type, ne zaman interface?

Başlangıç için basit karar:
Union type gerekiyorsa type kullan.

type Status = "success" | "error" | "loading";

Object shape tanımlıyorsan ikisi de olur.

type User = {
name: string;
age: number;
};

interface User {
name: string;
age: number;
}

## 12. Bu milestone'da bilmemiz gereken ana fikirler

type:

- Bir type'a isim verir
- Object shape tanımlayabilir
- Union type tanımlayabilir
- Daha genel amaçlıdır

interface:

- Object shape tanımlamak için kullanılır
- Function parameterlarında kullanılabilir
- Arrays ile kullanılabilir
- extends ile genişletilebilir

Başlangıç için:

- Union type gerekiyorsa type kullan
- Object shape için type veya interface kullanılabilir
- Projede tutarlı kal
