# Milestone 03 — Arrays
Array, birden fazla veriyi tek yerde tutmak için kullanılır.

const products = ["T-shirt", "Jacket", "Shoes"];

Bu yapı bir string array'dir. TypeScript bunu şöyle anlar:

string[] -> yazı listesi

Array içindeki elemanlara index ile erişilir. Array index'i 0'dan başlar.

products[0] -> ilk eleman
products[1] -> ikinci eleman
products[2] -> üçüncü eleman

# Adding Items - push() --> Array'in sonuna yeni eleman ekler.

const products = ["T-shirt", "Jacket"];

products.push("Shoes");

["T-shirt", "Jacket", "Shoes"]

# Looping Through Arrays
Bazı durumlarda array içindeki tüm elemanlara tek tek erişmek gerekir. Bunun için loop kullanılır. Başlangıç için en temiz yöntemlerden biri:

**for...of** -->  products array'indeki her elemanı sırayla dolaşır.

const products = ["T-shirt", "Jacket", "Shoes"];

for (const product of products) {
  console.log(product);
}

# Array Method — map() --> Array içindeki her elemanı dönüştürür. Yeni array üretir.

const products = ["t-shirt", "jacket"];

const upperProducts = products.map((product) => {
  return product.toUpperCase();
});

["T-SHIRT", "JACKET"]

# Array Method — filter() --> Belirli kurala uyan elemanları seçer.

const prices = [50, 100, 150];

const expensivePrices = prices.filter((price) => {
  return price >= 100;
});

[100, 150]

