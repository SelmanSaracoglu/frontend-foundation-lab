// 15-keyof-basics/exercises.ts

// =======================================================
// Exercise 1
// =======================================================

// User type oluştur.
// User içinde:
// name: string
// age: number
//
// UserKey type oluştur.
// UserKey = keyof User olsun.
//
// userKey adında UserKey type'ında değişken oluştur.
// Değer olarak "name" ver.
// Console'a yazdır.

// Your code here:


// Expected output:
// name


// =======================================================
// Exercise 2
// =======================================================

// Exercise 1'deki UserKey'i kullan.
// Başka bir değişken oluştur.
// Değer olarak "age" ver.
//
// Yorum satırı olarak şunu ekle:
// "email" neden UserKey için geçerli değildir?

// Your code here:


// Expected output:
// age


// =======================================================
// Exercise 3
// =======================================================

// printUserValue function yaz.
// Parameters:
// user: User
// key: keyof User
//
// Function user[key] değerini console'a yazdırsın.
//
// Bir user object oluştur.
// printUserValue ile "name" ve "age" değerlerini yazdır.

// Your code here:


// Expected output example:
// Ada
// 28


// =======================================================
// Exercise 4
// =======================================================

// Product type oluştur.
// Product içinde:
// title: string
// price: number
//
// printProductValue function yaz.
// Parameters:
// product: Product
// key: keyof Product
//
// Function product[key] değerini console'a yazdırsın.
//
// Product object oluştur.
// "title" ve "price" değerlerini yazdır.

// Your code here:


// Expected output example:
// Keyboard
// 120


// =======================================================
// Exercise 5
// =======================================================

// getValue adında generic function yaz.
//
// Type parameters:
// T
// K extends keyof T
//
// Parameters:
// item: T
// key: K
//
// Return type:
// T[K]
//
// Function item[key] döndürsün.
//
// User object ile "name" ve "age" için kullan.

// Your code here:


// Expected output example:
// Ada
// 28


// =======================================================
// Exercise 6
// =======================================================

// Exercise 5'teki getValue function'ını Product object ile kullan.
// "title" ve "price" değerlerini al.
// Console'a yazdır.

// Your code here:


// Expected output example:
// Keyboard
// 120


// =======================================================
// Exercise 7
// =======================================================

// Aşağıdaki soruları yorum satırı olarak cevapla:
//
// 1. keyof ne üretir?
// 2. keyof User ne anlama gelir?
// 3. K extends keyof T neyi garanti eder?
// 4. T[K] return type ne anlama gelir?

// Your answers here: