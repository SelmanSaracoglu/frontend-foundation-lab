// phase-3-review/exercises.ts

// Exercise 1:
// Product type oluştur.
// Alanlar:
// - id: number
// - name: string
// - price: number
// - status: "active" | "archived"

// Buraya Product yaz.


// Exercise 2:
// AppError type oluştur.
// code değerleri:
// - "INVALID_JSON"
// - "INVALID_PRODUCT_DATA"
// - "PRODUCT_ARCHIVED"

// message: string olsun.

// Buraya AppError yaz.


// Exercise 3:
// Generic Result<T> type oluştur.

// Buraya Result<T> yaz.


// Exercise 4:
// isProduct(value: unknown): value is Product type guard yaz.
// Tüm alanların tiplerini kontrol et.

// Buraya isProduct yaz.


// Exercise 5:
// parseProductJson(input: string): Promise<Result<Product>> yaz.
//
// Kurallar:
// - JSON.parse try/catch içinde olsun.
// - parsed data unknown kabul edilsin.
// - isProduct başarısızsa INVALID_PRODUCT_DATA dön.
// - JSON parse patlarsa INVALID_JSON dön.
// - başarılıysa Product dön.

// Buraya parseProductJson yaz.


// Exercise 6:
// requireActiveProduct(input: string): Promise<Result<Product>> yaz.
//
// Kurallar:
// - önce parseProductJson çağır.
// - parse başarısızsa aynı error result'ı dön.
// - product status "archived" ise PRODUCT_ARCHIVED dön.
// - başarılıysa Product dön.

// Buraya requireActiveProduct yaz.


// Exercise 7:
// runProductExample fonksiyonu yaz.
// requireActiveProduct çağır.
// Başarılıysa product name yazdır.
// Başarısızsa error.code ve error.message yazdır.

// Buraya runProductExample yaz.
