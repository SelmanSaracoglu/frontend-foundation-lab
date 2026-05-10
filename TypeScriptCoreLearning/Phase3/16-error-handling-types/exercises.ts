// 14-error-handling-types/exercises.ts

// Exercise 1:
// Generic bir Result<T> type oluştur.
// Başarılı durumda:
// - success: true
// - data: T
//
// Başarısız durumda:
// - success: false
// - error: string

// Buraya Result<T> yaz.


// Exercise 2:
// Aşağıdaki Product type'ını kullanarak findProductById fonksiyonunu yaz.
// id 1 ise başarılı Product dön.
// id 1 değilse error olarak "Product not found" dön.

type Product = {
  id: number;
  name: string;
  price: number;
};

// function findProductById(id: number): Result<Product> {
//   Burayı tamamla.
// }


// Exercise 3:
// findProductById sonucunu kontrol et.
// Başarılıysa product name yazdır.
// Başarısızsa error yazdır.

// Burayı tamamla.


// Exercise 4:
// AppError type oluştur.
// code değerleri:
// - "INVALID_INPUT"
// - "PRODUCT_NOT_FOUND"
// - "UNAUTHORIZED"
//
// message: string olsun.

// Buraya AppError yaz.


// Exercise 5:
// AppResult<T> type oluştur.
// Başarılı durumda data T olsun.
// Başarısız durumda error AppError olsun.

// Buraya AppResult<T> yaz.


// Exercise 6:
// deleteProduct fonksiyonu yaz.
// Kurallar:
// - id <= 0 ise INVALID_INPUT dön.
// - userRole "admin" değilse UNAUTHORIZED dön.
// - id !== 1 ise PRODUCT_NOT_FOUND dön.
// - her şey doğruysa success true ve data "Product deleted" dön.

type Role = "admin" | "user";

function deleteProduct(id: number, userRole: Role) {
  // Return type'ı AppResult<string> olacak şekilde düzenle.
  // Burayı tamamla.
}


// Exercise 7:
// deleteProduct sonucunu kontrol et.
// Başarılıysa data yazdır.
// Başarısızsa error.code ve error.message yazdır.

// Burayı tamamla.