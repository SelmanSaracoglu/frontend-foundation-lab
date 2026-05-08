// 12-type-guards/exercises.ts

// =======================================================
// Exercise 1
// =======================================================

// printValue adında bir function yaz.
// Parameter olarak value: string | number alsın.
//
// Eğer value string ise büyük harfle yazdır.
// Eğer value number ise value + 100 yazdır.

// Your code here:


// Expected output example:
// HELLO
// 120


// =======================================================
// Exercise 2
// =======================================================

// printInput adında bir function yaz.
// Parameter olarak input: string | number | boolean alsın.
//
// Eğer string ise input.length yazdır.
// Eğer number ise input * 3 yazdır.
// Eğer boolean ise tersini yazdır.

// Your code here:


// Expected output example:
// 10
// 30
// false


// =======================================================
// Exercise 3
// =======================================================

// User type oluştur:
// name: string
//
// Admin type oluştur:
// name: string
// permissions: string[]
//
// printPerson adında bir function yaz.
// Parameter olarak person: User | Admin alsın.
//
// Eğer permissions property’si varsa permissions yazdır.
// Yoksa name yazdır.

// Your code here:


// Expected output example:
// Ada
// [ 'create', 'delete' ]


// =======================================================
// Exercise 4
// =======================================================

// SuccessResult type oluştur:
// status: "success"
// data: string
//
// ErrorResult type oluştur:
// status: "error"
// message: string
//
// Result type oluştur:
// SuccessResult | ErrorResult
//
// handleResult function yaz.
// Eğer status "success" ise data yazdır.
// Eğer status "error" ise message yazdır.

// Your code here:


// Expected output example:
// User loaded
// User not found


// =======================================================
// Exercise 5
// =======================================================

// printUnknown adında bir function yaz.
// Parameter olarak value: unknown alsın.
//
// Eğer value string ise toUpperCase ile yazdır.
// Eğer value number ise value * 2 yazdır.
// Eğer value boolean ise "boolean value" yazdır.

// Your code here:


// Expected output example:
// TYPESCRIPT
// 40
// boolean value


// =======================================================
// Exercise 6
// =======================================================

// printFirstItem adında bir function yaz.
// Parameter olarak value: unknown alsın.
//
// Eğer value array ise ilk elemanını yazdır.
//
// İpucu:
// Array.isArray(value)

// Your code here:


// Expected output example:
// apple


// =======================================================
// Exercise 7
// =======================================================

// Aşağıdaki soruları yorum satırı olarak cevapla:
//
// 1. Type guard ne işe yarar?
// 2. typeof value === "string" neden güvenlidir?
// 3. "permissions" in person neyi kontrol eder?
// 4. Type guard mı type assertion mı daha güvenlidir? Neden?

// Your answers here:
