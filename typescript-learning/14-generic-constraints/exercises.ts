// 14-generic-constraints/exercises.ts

// =======================================================
// Exercise 1
// =======================================================

// printId adında generic function yaz.
// T, en azından id: number içermeli.
// Function item.id değerini console'a yazdırsın.
//
// Function'ı iki farklı object ile çağır:
// 1. { id: 1, name: "Ada" }
// 2. { id: 2, title: "Keyboard" }

// Your code here:


// Expected output:
// 1
// 2


// =======================================================
// Exercise 2
// =======================================================

// printName adında generic function yaz.
// T, en azından name: string içermeli.
// Function item.name değerini console'a yazdırsın.
//
// Function'ı iki farklı object ile çağır.

// Your code here:


// Expected output example:
// Elif
// Mouse


// =======================================================
// Exercise 3
// =======================================================

// returnItem adında generic function yaz.
// T, en azından id: number içermeli.
// Function aldığı item'ı geri döndürsün.
//
// Function'ı şu object ile çağır:
// { id: 1, name: "Deniz", age: 32 }
//
// Dönen değerin name ve age değerlerini console'a yazdır.

// Your code here:


// Expected output:
// Deniz
// 32


// =======================================================
// Exercise 4
// =======================================================

// Product type oluştur.
// Product içinde:
// id: number
// title: string
// price: number
//
// products adında Product[] array oluştur.
// En az 2 product ekle.
//
// findById adında generic function yaz.
// T, en azından id: number içermeli.
// Parameters:
// items: T[]
// id: number
//
// Return type:
// T | undefined
//
// Function, id eşleşen item'ı dönsün.

// Your code here:


// Expected output example:
// { id: 2, title: 'Mouse', price: 80 }


// =======================================================
// Exercise 5
// =======================================================

// Exercise 4'teki findById function'ını olmayan bir id ile çağır.
// Sonuç undefined ise "Item not found" yazdır.

// Your code here:


// Expected output:
// Item not found


// =======================================================
// Exercise 6
// =======================================================

// Aşağıdaki soruları yorum satırı olarak cevapla:
//
// 1. Generic constraint ne işe yarar?
// 2. T extends { id: number } ne anlama gelir?
// 3. Constraint kullanınca object sadece id property’sinden mi oluşmak zorundadır?
// 4. findById neden T | undefined döndürür?

// Your answers here:

