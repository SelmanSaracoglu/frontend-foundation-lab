# Milestone 05 — Union Types
Bir değişkenin birden fazla tipte olabilmesini sağlar.

let orderId: string | number;

orderId string olabilir VEYA number olabilir.

# Union Types with Functions
Union type, fonksiyon parametrelerinde de kullanılabilir.

function printId(id: string | number) {
  console.log(id);
}

Burada id: string olabilir veya number olabilir.

# Type Narrowing 
Union type kullanırken bazen gerçek tipi kontrol etmek gerekir.

function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  }
}

typeof id === "string" --> kontrolü sayesinde TypeScript artık id'nin string olduğunu anlar.

# Optional Properties
Bazı object property'leri zorunlu olmayabilir.

Bunun için "?" kullanılır.

type User = {
  name: string;
  phone?: string;
};

name -> zorunlu
phone -> optional
