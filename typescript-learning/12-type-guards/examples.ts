// 12-type-guards/examples.ts

// =======================================================
// Example 1: typeof with string | number
// =======================================================

function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }

  if (typeof value === "number") {
    console.log(value + 10);
  }
}

printValue("hello");
printValue(20);

// Expected output:
// HELLO
// 30


// =======================================================
// Example 2: typeof with multiple primitive types
// =======================================================

function printInput(input: string | number | boolean) {
  if (typeof input === "string") {
    console.log(input.toUpperCase());
  }

  if (typeof input === "number") {
    console.log(input * 2);
  }

  if (typeof input === "boolean") {
    console.log(!input);
  }
}

printInput("typescript");
printInput(15);
printInput(true);

// Expected output:
// TYPESCRIPT
// 30
// false


// =======================================================
// Example 3: in operator with object union
// =======================================================

type User = {
  name: string;
};

type Admin = {
  name: string;
  permissions: string[];
};

function printPerson(person: User | Admin) {
  if ("permissions" in person) {
    console.log(person.permissions);
  } else {
    console.log(person.name);
  }
}

printPerson({
  name: "Ada",
});

printPerson({
  name: "Elif",
  permissions: ["create", "delete"],
});

// Expected output:
// Ada
// [ 'create', 'delete' ]


// =======================================================
// Example 4: Literal property type guard
// =======================================================

type SuccessResult = {
  status: "success";
  data: string;
};

type ErrorResult = {
  status: "error";
  message: string;
};

type Result = SuccessResult | ErrorResult;

function handleResult(result: Result) {
  if (result.status === "success") {
    console.log(result.data);
  }

  if (result.status === "error") {
    console.log(result.message);
  }
}

handleResult({
  status: "success",
  data: "User loaded",
});

handleResult({
  status: "error",
  message: "User not found",
});

// Expected output:
// User loaded
// User not found


// =======================================================
// Example 5: unknown with type guard
// =======================================================

function printUnknown(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }

  if (typeof value === "number") {
    console.log(value * 2);
  }
}

printUnknown("safe");
printUnknown(50);

// Expected output:
// SAFE
// 100


// =======================================================
// Example 6: Type guard before array usage
// =======================================================

function printFirstItem(value: unknown) {
  if (Array.isArray(value)) {
    console.log(value[0]);
  }
}

printFirstItem(["apple", "banana"]);

// Expected output:
// apple