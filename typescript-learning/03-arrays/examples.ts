const products = ["T-shirt", "Jacket", "Shoes"];

console.log(products);
console.log(products[0]);
console.log(products[1]);
console.log(products[2]);

products.push("Pants");

console.log(products);

// for...of ile tüm ürünleri console.log ile yazdır.
for (const product of products) {
  console.log(product);
}
// map() ile tüm ürünleri büyük harfe çevirip yeni bir array oluştur.
const upperProducts = products.map((product) => 
    {return product.toUpperCase();}
);

console.log("Uppercase products:", upperProducts);

// filter() ile "prices" array'inden sadece 100 ve üzeri olanları filtrele.
const prices = [50, 100, 150];

const expensivePrices = prices.filter((price) => {
  return price >= 100;
});

console.log(expensivePrices);

