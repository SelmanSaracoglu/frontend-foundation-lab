// 12-unknown-any-never/exercises.ts

// Exercise 1:
// Aşağıdaki any kullanımını unknown ile değiştir.
// Sonra value string ise uppercase yazdır,
// number ise ikiyle çarpılmış halini yazdır.

let value: any = "typescript";

// Burayı düzenle.


// Exercise 2:
// Aşağıdaki fonksiyon güvenli değil.
// Çünkü input any.
// input'u unknown yap ve yalnızca string ise trim edilmiş halini döndür.
// string değilse "Invalid input" döndür.

function normalizeInput(input: any): string {
  return input.trim();
}


// Exercise 3:
// JSON.parse sonucunu doğrudan User olarak cast etme.
// rawData'yı unknown olarak kabul et.
// Basit kontrollerle object olup olmadığını ve içinde email alanı olup olmadığını kontrol et.

type User = {
  id: number;
  email: string;
};

const rawData = JSON.parse('{"id":1,"email":"user@example.com"}');

// Burayı güvenli hale getir.


// Exercise 4:
// Aşağıdaki fail fonksiyonunun return type'ını doğru şekilde yaz.

function fail(message: string) {
  throw new Error(message);
}


// Exercise 5:
// Aşağıdaki union type'a exhaustive checking ekle.
// default içinde never kullan.

type ApiStatus = "idle" | "loading" | "success" | "error";

function getApiStatusMessage(status: ApiStatus): string {
  switch (status) {
    case "idle":
      return "Waiting";
    case "loading":
      return "Loading";
    case "success":
      return "Success";
    case "error":
      return "Error";
  }
}