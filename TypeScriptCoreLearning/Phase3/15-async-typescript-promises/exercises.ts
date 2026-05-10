// 15-async-typescript-promises/exercises.ts

// Exercise 1:
// Aşağıdaki Order type'ını kullanarak async getOrder fonksiyonu yaz.
// Fonksiyon Promise<Order> dönsün.

type Order = {
  id: number;
  total: number;
  status: "pending" | "paid" | "cancelled";
};

// function getOrder(): Promise<Order> {
//   Burayı tamamla.
// }


// Exercise 2:
// getOrder fonksiyonunu await ile çağıran printOrderStatus fonksiyonu yaz.
// Return type Promise<void> olsun.
// Order status değerini console.log ile yazdır.

// Burayı tamamla.


// Exercise 3:
// AppError ve Result<T> type'larını yaz.
// AppError code değerleri:
// - "INVALID_INPUT"
// - "ORDER_NOT_FOUND"
// - "FORBIDDEN"

type Role = "admin" | "user";

// Burayı tamamla.


// Exercise 4:
// findOrderById async fonksiyonu yaz.
// Return type Promise<Result<Order>> olsun.
//
// Kurallar:
// - id <= 0 ise INVALID_INPUT dön.
// - id !== 1 ise ORDER_NOT_FOUND dön.
// - id 1 ise başarılı Order dön.

// Burayı tamamla.


// Exercise 5:
// cancelOrder async fonksiyonu yaz.
// Return type Promise<Result<string>> olsun.
//
// Kurallar:
// - role admin değilse FORBIDDEN dön.
// - orderId <= 0 ise INVALID_INPUT dön.
// - orderId !== 1 ise ORDER_NOT_FOUND dön.
// - başarılıysa "Order cancelled" dön.

// Burayı tamamla.


// Exercise 6:
// cancelOrder sonucunu await ile çağıran runCancelOrderExample fonksiyonu yaz.
// Başarılıysa data yazdır.
// Başarısızsa error.code ve error.message yazdır.

// Burayı tamamla.


// Exercise 7:
// Aşağıdaki fonksiyonun neden riskli olduğunu düşün.
// Sonra bunu Result modeliyle daha güvenli hale getir.

// async function parseUserJson(input: string): Promise<User> {
//   return JSON.parse(input) as User;
// }

type User = {
  id: number;
  email: string;
};

// Bonus:
// parseUserJsonSafe(input: string): Promise<Result<User>> yaz.
// JSON.parse try/catch içinde olsun.
// Parsed data unknown kabul edilsin.
// id number ve email string değilse INVALID_INPUT dön.