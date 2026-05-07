type Product = {
  name: string;
  price: number;
};

const product: Product = {
  name: "Jacket",
  price: 99
};

console.log(product.name);

const products: Product[] = [
  {
    name: "Jacket",
    price: 99
  },
  {
    name: "Shoes",
    price: 149
  }
];

console.log(products);
console.log(products[0].name);
console.log(products[1].price);


console.log("------------");

products.map((product) => {
  console.log(product.name);
});

