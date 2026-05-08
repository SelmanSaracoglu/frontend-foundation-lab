// 13-generics-basics/exercises.ts

// =======================================================
// Exercise 1
// =======================================================

// returnString function yaz.
// Parameter olarak value: string alsın.
// Geriye aynı value değerini döndürsün.
//
// returnNumber function yaz.
// Parameter olarak value: number alsın.
// Geriye aynı value değerini döndürsün.

// Your code here:


// Expected output example:
// hello
// 100


// =======================================================
// Exercise 2
// =======================================================

// returnValue adında generic function yaz.
// Parameter olarak value: T alsın.
// Return type T olsun.
// Geriye value döndürsün.
//
// Function'ı string, number ve boolean ile çağır.

// Your code here:


// Expected output example:
// hello
// 100
// true


// =======================================================
// Exercise 3
// =======================================================

// getFirstItem adında generic function yaz.
// Parameter olarak items: T[] alsın.
// Return type T olsun.
// Array'in ilk elemanını döndürsün.
//
// Function'ı number[] ve string[] ile çağır.

// Your code here:


// Expected output example:
// 10
// Ada


// =======================================================
// Exercise 4
// =======================================================

// User type oluştur.
// User içinde name: string ve age: number olsun.
//
// users adında User[] array oluştur.
// En az 2 user ekle.
//
// Exercise 3'teki getFirstItem function'ını users ile kullan.
// Dönen user'ın name ve age değerlerini console'a yazdır.

// Your code here:


// Expected output example:
// Ada
// 28


// =======================================================
// Exercise 5
// =======================================================

// ApiResponse<T> adında generic type alias oluştur.
// İçinde:
// data: T
// success: boolean
//
// Product type oluştur.
// Product içinde title: string ve price: number olsun.
//
// productResponse adında ApiResponse<Product> oluştur.
// data.title, data.price ve success değerlerini console'a yazdır.

// Your code here:


// Expected output example:
// Keyboard
// 120
// true


// =======================================================
// Exercise 6
// =======================================================

// ApiResponse<string> kullanarak messageResponse oluştur.
// data değeri "Saved successfully" olsun.
// success true olsun.
// data ve success değerlerini console'a yazdır.

// Your code here:


// Expected output example:
// Saved successfully
// true


// =======================================================
// Exercise 7
// =======================================================

// Aşağıdaki soruları yorum satırı olarak cevapla:
//
// 1. Generic ne işe yarar?
// 2. any yerine generic kullanmanın avantajı nedir?
// 3. function returnValue<T>(value: T): T içindeki T neyi temsil eder?
// 4. getFirstItem([10, 20, 30]) çağrısında T hangi type olur?

// Your answers here: