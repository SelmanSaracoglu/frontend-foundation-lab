// 12-unknown-any-never/examples.ts

// -----------------------------------------------------
// 1. any: TypeScript kontrolünü devre dışı bırakır
// -----------------------------------------------------

let unsafeValue: any = "hello";

// TypeScript bunlara izin verir.
// Ama bazıları runtime'da patlayabilir.
console.log(unsafeValue.toUpperCase());

// Bu satır compile-time'da hata vermez,
// fakat runtime'da hata verir çünkü string üzerinde toFixed yoktur.
// console.log(unsafeValue.toFixed(2));


// -----------------------------------------------------
// 2. unknown: kullanmadan önce kontrol ister
// -----------------------------------------------------

let safeValue: unknown = "hello";

// Bu hata verir:
// safeValue.toUpperCase();

if (typeof safeValue === "string") {
  console.log(safeValue.toUpperCase());
}


// -----------------------------------------------------
// 3. JSON.parse sonucu güvenilir değildir
// -----------------------------------------------------

type User = {
  id: number;
  email: string;
};

const rawUser: unknown = JSON.parse('{"id":1,"email":"admin@example.com"}');

if (
  typeof rawUser === "object" &&
  rawUser !== null &&
  "id" in rawUser &&
  "email" in rawUser
) {
  console.log("Raw user has id and email fields");
}


// -----------------------------------------------------
// 4. never: hata fırlatan fonksiyon
// -----------------------------------------------------

function fail(message: string): never {
  throw new Error(message);
}

function getUserEmail(user: User | null): string {
  if (user === null) {
    return fail("User not found");
  }

  return user.email;
}

console.log(getUserEmail({ id: 1, email: "test@example.com" }));


// -----------------------------------------------------
// 5. never: exhaustive checking
// -----------------------------------------------------

type OrderStatus = "pending" | "paid" | "cancelled";

function getOrderStatusLabel(status: OrderStatus): string {
  switch (status) {
    case "pending":
      return "Order is waiting for payment";
    case "paid":
      return "Order has been paid";
    case "cancelled":
      return "Order was cancelled";
    default: {
      const unreachable: never = status;
      return unreachable;
    }
  }
}

console.log(getOrderStatusLabel("paid"));