### 06 - Destructuring

Şu ana kadar object ve array içindeki değerlere genelde bu şekilde ulaştık:

const user = {
name: "Ada",
age: 28,
};

console.log(user.name);
console.log(user.age);

Bu kullanım doğrudur. Ama bazı durumlarda aynı object adını tekrar tekrar yazmak gerekir: Destructuring, object veya array içindeki değerleri daha kısa ve okunabilir şekilde değişkenlere almamızı saglar.

## 1. Object destructuring nedir?

const user = {
name: "Ada",
age: 28,
};

**Normalde property değerlerini şöyle alırız:**

const name = user.name;
const age = user.age;

**Destructuring ile bunu şöyle yazabiliriz:**

const { name, age } = user;

Bu satır şu anlama gelir:

- user object'inin içinden name property değerini al
- user object'inin içinden age property değerini al
- name ve age adında iki değişken oluştur

**Örneğin:**

const { name } = user;
Bu satır user.name değerini alır.

## 2. Destructuring neden var? Destructuring'in amacı yeni bir veri yapısı oluşturmak değildir.

Asıl amacı:

- object içinden değer almayı kolaylaştırmak
- tekrar eden object.property yazımını azaltmak
- function içinde daha temiz kod yazmak
- array elemanlarını daha kolay değişkenlere almak

## 3. TypeScript destructuring sırasında type bilgisini nasıl anlar?

type User = {
name: string;
age: number;
};

Şimdi bu type'ı kullanalım:

type User = {
name: string;
age: number;
};

const user: User = {
name: "Ada",
age: 28,
};

const { name, age } = user;

Burada TypeScript şunu anlar:

- name bir string'dir
- age bir number'dır

Çünkü user değişkeninin type'ı zaten User'dır. Yani destructuring sırasında ayrıca name ve age için type yazmamıza gerek yoktur. Şunu yazmamıza genellikle gerek yok:

const { name, age }: { name: string; age: number } = user;

Çünkü user zaten type'lıdır:

const user: User = {
name: "Ada",
age: 28,
};

Bu yüzden TypeScript, destructuring ile çıkan değerlerin type'larını kendisi çıkarır.

## 4. Function parameter içinde destructuring

Daha önce functionlarda object parameter kullanmıştık.

type User = {
name: string;
age: number;
};

function printUser(user: User) {
console.log(user.name);
console.log(user.age);
}

Burada function bir User object alır. Parameter adı user'dır. Bu yüzden function içinde değerlere şöyle ulaşırız:

user.name
user.age

Aynı function destructuring ile şöyle yazılabilir:

function printUser({ name, age }: User) {
console.log(name);
console.log(age);
}

Burada çok önemli bir fark vardır. Normal kullanımda:
function printUser(user: User)

function içinde user değişkeni oluşur. Yani şunları kullanabiliriz:

user
user.name
user.age

Destructuring kullanımında:
function printUser({ name, age }: User)

function içinde user değişkeni oluşmaz. Onun yerine direkt şu değişkenler oluşur:

name
age

Yani bu kullanımda şunu yapabiliriz:

console.log(name);
console.log(age);

Ama şunu yapamayız:

console.log(user);

Çünkü parameter'a user ismini vermedik. Object'i içeri alırken doğrudan parçaladık.

## 5. Function parameter destructuring nasıl okunmalı?

Şu syntax ilk başta karışık görünebilir:

function printUser({ name, age }: User) {
console.log(name);
console.log(age);
}

Bunu şöyle okumalıyız:

Function'a User type'ında bir object gelecek. Ben bu object'in içinden name ve age property'lerini çıkaracağım. Function içinde direkt name ve age değişkenlerini kullanacağım.

Buradaki User kendiliğinden gelmez. Öncesinde bizim tarafımızdan tanımlanmış olmalıdır:

type User = {
name: string;
age: number;
};

Yani User bir değişken değildir. User bir type adıdır.

## 6. Function parameter destructuring ile normal kullanım karşılaştırması

Normal kullanım:

type User = {
name: string;
age: number;
};

function printUser(user: User) {
console.log(user.name);
console.log(user.age);
}

const user: User = {
name: "Ada",
age: 28,
};

printUser(user);

Destructuring kullanımı:

type User = {
name: string;
age: number;
};

function printUser({ name, age }: User) {
console.log(name);
console.log(age);
}

const user: User = {
name: "Ada",
age: 28,
};

printUser(user);

İki function da dışarıdan aynı şekilde çağrılır:

printUser(user);

Fark function'ın içindedir.

Normal versiyonda object komple user adıyla kullanılır.

Destructuring versiyonda object'in içinden name ve age alınır.

## 7. Optional property ile destructuring

Daha önce optional property öğrenmiştik.

Örnek:

type User = {
name: string;
age?: number;
};

Burada age optional'dır. Yani bazı user object'lerinde age olabilir, bazılarında olmayabilir.

const user: User = {
name: "Ada",
};

Şimdi destructuring yapalım:

const { name, age } = user;

Burada:

- name kesin string'dir
- age number veya undefined olabilir

Çünkü age optional'dır. Bu yüzden TypeScript age için şunu düşünür:

number | undefined

Örneğin:

if (age !== undefined) {
console.log(age);
}

Bu kontrol type narrowing'dir. Yani age gerçekten varsa, o blok içinde TypeScript age değerini number olarak kabul eder.

## 8. Default value ile destructuring

Optional property bazen undefined olabilir.

Örneğin:

type User = {
name: string;
age?: number;
};

const user: User = {
name: "Ada",
};

const { name, age = 0 } = user;

Burada age yoksa varsayılan olarak 0 kullanılır. Yani:

const { age = 0 } = user;

şu anlama gelir:

Eğer user.age varsa onu kullan.
Eğer user.age undefined ise 0 kullan.

Önemli:
Default value sadece değer undefined olduğunda devreye girer.

## 9. Destructuring sırasında değişken adını değiştirme

Bazen object property adı ile oluşturmak istediğimiz değişken adı farklı olabilir.

const user = {
name: "Ada",
age: 28,
};

const { name: userName } = user;

Burada user.name değeri alınır ama değişken adı userName olur.

Yani bu: const { name: userName } = user;
şuna benzer: const userName = user.name;

Önemli:
Bu kullanımda name adında bir değişken oluşmaz. Sadece userName oluşur.

Yani şu çalışır: console.log(userName);
Ama şu çalışmaz: console.log(name);

Çünkü değişkenin adını userName yaptık.

## 10. Array destructuring nedir?

Destructuring sadece objectlerde değil, arraylerde de kullanılabilir. Elimizde şöyle bir array olsun:

const colors = ["red", "green", "blue"];

Normalde elemanlara index ile ulaşırız:

const firstColor = colors[0];
const secondColor = colors[1];

Array destructuring ile şöyle yazabiliriz:

const [firstColor, secondColor] = colors;

Bu satır şu anlama gelir:

- colors array'inin 0. elemanını firstColor değişkenine koy
- colors array'inin 1. elemanını secondColor değişkenine koy

Object destructuring'de property isimleri önemlidir. Array destructuring'de sıra önemlidir.
Object: const { name, age } = user;
Burada name ve age property isimleridir.

Array: const [first, second] = colors;
Burada first ve second bizim verdiğimiz değişken isimleridir.
Array'de hangi değerin geleceğini sıra belirler.

## 11. Array destructuring ve type inference

const scores = [90, 80, 70];
const [firstScore, secondScore] = scores;

TypeScript burada firstScore ve secondScore için number type'ını çıkarır. Çünkü scores array'i number değerlerden oluşur.

firstScore -> number
secondScore -> number

## 12. Destructuring ile map kullanımı

Daha önce array ve map öğrenmiştik. Elimizde typed object array olsun:

type Product = {
title: string;
price: number;
};

const products: Product[] = [
{ title: "Keyboard", price: 120 },
{ title: "Mouse", price: 80 },
];

Normal map kullanımı:

const titles = products.map((product) => {
return product.title;
});

Destructuring ile:

const titles = products.map(({ title }) => {
return title;
});

Burada map her product object'ini tek tek function'a gönderir. Normalde parameter product adını alır:
(product) => product.title

Destructuring ile parameter içinde product object'inden title direkt çıkarılır:
({ title }) => title

Bu kullanım şu anlama gelir: Her product object'inden title property değerini al.

## 13. Destructuring ile filter kullanımı

Elimizde yine products array'i olsun:

type Product = {
title: string;
price: number;
};

const products: Product[] = [
{ title: "Keyboard", price: 120 },
{ title: "Mouse", price: 80 },
];

Normal filter kullanımı:
const expensiveProducts = products.filter((product) => {
return product.price > 100;
});

Destructuring ile:
const expensiveProducts = products.filter(({ price }) => {
return price > 100;
});

Burada her product object'inden price değeri çıkarılır. Sonra price > 100 kontrolü yapılır.

## 14. Ne zaman destructuring kullanmalı?

Destructuring kullanmak iyidir ama her zaman zorunlu değildir.

Kullanmak mantıklıdır:

- Object içinden birkaç property kullanacaksak
- Function içinde sürekli object.property yazıyorsak
- map/filter içinde tek bir property ile çalışıyorsak
- Kod daha okunabilir hale geliyorsa

Kullanmamak daha iyi olabilir:

- Object'in tamamına ihtiyaç varsa
- Sadece bir yerde tek property kullanıyorsak
- Destructuring kodu daha karışık gösteriyorsa

Örneğin bu gayet okunabilir:
console.log(user.name);

Bunu illa şöyle yapmak zorunda değiliz:
const { name } = user;
console.log(name);

Destructuring bir araçtır. Amaç daha temiz ve anlaşılır kod yazmaktır.

## 15. Bu milestone'da bilmemiz gereken ana fikirler

Object destructuring:
const { name, age } = user;
Object property isimlerine göre çalışır.

Function parameter destructuring:
function printUser({ name, age }: User) {
console.log(name);
console.log(age);
}
Function'a object gelir, ama içeride sadece seçilen property'ler değişken olur.

Optional property destructuring:
const { age } = user;
age optional ise age değeri undefined olabilir.

Default value:
const { age = 0 } = user;
age undefined ise 0 kullanılır.

Rename:
const { name: userName } = user;
user.name alınır ama değişken adı userName olur.

Array destructuring:
const [first, second] = colors;
Array'de sıra önemlidir.

map/filter içinde destructuring:
products.map(({ title }) => title);
products.filter(({ price }) => price > 100);
