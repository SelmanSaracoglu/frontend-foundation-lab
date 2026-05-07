# Milestone 04 — Objects - Bir varlığa ait bilgileri tek yerde tutar.

const product = {
  name: "Jacket",
  price: 99,
  inStock: true
};

# Property 

product.name --> product object’inin name bilgisini getir

# Object Types - TypeScript'te object'in yapısını önceden tanımlayabiliriz.

const product: {
  name: string;
  price: number;
  inStock: boolean;
} = {
  name: "Jacket",
  price: 99,
  inStock: true
};

# Arrays of Objects

const products = [
  {
    name: "Jacket",
    price: 99
  },
  {
    name: "Shoes",
    price: 149
  }
];

products -> array 
array içindeki her eleman -> object

# Reusable Object Types
TypeScript'te object type'larına isim verebiliriz. Bunun için type kullanılır.

type Product = {
  name: string;
  price: number;
};

const product: Product = {
  name: "Jacket",
  price: 99
};

Bu yapı: tekrar eden type yazımını azaltır.