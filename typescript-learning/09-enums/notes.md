# 09 - Enums

Literal types konusunda belirli değerleri sınırlamayı öğrendik.
type Status = "loading" | "success" | "error";

Bu kullanım çok yaygındır. Enum da benzer bir problem için vardır:
Belirli sabit değerleri bir isim altında toplamak.

## 1. Enum nedir? Enum, ilişkili sabit değerleri gruplamak için kullanılır.

enum Status {
Loading = "loading",
Success = "success",
Error = "error",
}

Burada Status adında bir grup oluşturduk.
Bu grubun içinde 3 değer var:

- Status.Loading
- Status.Success
- Status.Error

Kullanım:
let currentStatus: Status = Status.Loading;

Burada currentStatus sadece Status enum içindeki değerlerden biri olabilir.

## 2. Enum neden var? Bazı değerler uygulama içinde tekrar tekrar kullanılır.

"loading"
"success"
"error"

Bu stringleri her yerde elle yazarsak typo yapabiliriz: "succes"
Enum ile değerleri tek bir yerde toplarız: Status.Success
Böylece string yazmak yerine enum üyesini kullanırız.

## 3. String enum --> Başlangıç için en anlaşılır enum türü string enum'dur.

enum UserRole {
Admin = "admin",
Editor = "editor",
Viewer = "viewer",
}

Kullanım:
const role: UserRole = UserRole.Admin;
Burada role değeri "admin" string'ine karşılık gelir.
Ama biz kodda doğrudan "admin" yazmak yerine UserRole.Admin kullanırız.

## 4. Enum function parameter olarak kullanılabilir

enum Direction {
Left = "left",
Right = "right",
Up = "up",
Down = "down",
}

function move(direction: Direction) {
console.log(direction);
}

move(Direction.Left);

Function herhangi bir string almaz. Sadece Direction enum değerlerinden birini alır.

## 5. Enum object property içinde kullanılabilir

enum TaskStatus {
Todo = "todo",
InProgress = "in-progress",
Done = "done",
}

type Task = {
title: string;
status: TaskStatus;
};

const task: Task = {
title: "Learn enums",
status: TaskStatus.InProgress,
};

Burada status property’si sadece TaskStatus değerlerinden biri olabilir.

## 6. Enum ve literal union farkı

Literal union:
type Status = "loading" | "success" | "error";

Enum:
enum Status {
Loading = "loading",
Success = "success",
Error = "error",
}

İkisi de değerleri sınırlandırabilir.

Fark:
Literal union daha hafiftir.
Enum ise runtime'da gerçek bir JavaScript object üretir.

Başlangıç için pratik kural:

- Basit string seçenekleri için literal union çoğu zaman yeterlidir.
- Değerleri isimli bir grup olarak kullanmak istiyorsak enum tercih edilebilir.

## 7. Kısa özet

Enum, ilişkili sabit değerleri isimli bir grup altında toplar.
En yaygın güvenli kullanım string enum'dur.

enum Status {
Loading = "loading",
Success = "success",
Error = "error",
}

Kullanım:

Status.Loading
Status.Success
Status.Error

Enum özellikle status, role, direction, task state gibi sınırlı seçeneklerde kullanılabilir.
