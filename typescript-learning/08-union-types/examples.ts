let orderId: string | number;

orderId = "A123";
console.log(orderId);

orderId = 500;
console.log(orderId);

type OrderStatus =
  | "pending"
  | "completed"
  | "cancelled";

let status: OrderStatus;

status = "pending";
console.log(status);

function printId(id: string | number) {
  console.log(id);
}

printId("A123");
printId(500);

function printtId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  }
}

printId("abc");


type User = {
  name: string;
  phone?: string;
};

const user1: User = {
  name: "Selman"
};

const user2: User = {
  name: "Ayşe",
  phone: "123456"
};

console.log(user1);
console.log(user2);



type Product = {
  name: string;
  price: number;
  inStock: boolean;
};

const products: Product[] = [
  {
    name: "Jacket",
    price: 99,
    inStock: true
  },
  {
    name: "Shoes",
    price: 149,
    inStock: false
  },
  {
    name: "T-shirt",
    price: 49,
    inStock: true
  }
];

const availableProducts = products.filter((product) => {
  return product.inStock;
});

availableProducts.map((product) => {
  console.log(product.name);
});

