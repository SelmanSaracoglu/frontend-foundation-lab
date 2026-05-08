// 08-literal-types/examples.ts

// =======================================================
// Example 1: Normal string type
// =======================================================

let normalRole: string = "admin";

normalRole = "user";
normalRole = "anything";

console.log(normalRole);

// Expected output:
// anything


// =======================================================
// Example 2: String literal type
// =======================================================

let adminRole: "admin" = "admin";

adminRole = "admin";

// This would be an error:
// adminRole = "user";

console.log(adminRole);

// Expected output:
// admin


// =======================================================
// Example 3: Literal union type
// =======================================================

type Status = "loading" | "success" | "error";

let currentStatus: Status = "loading";

console.log(currentStatus);

currentStatus = "success";

console.log(currentStatus);

// This would be an error:
// currentStatus = "done";

// Expected output:
// loading
// success


// =======================================================
// Example 4: Literal type as function parameter
// =======================================================

type Direction = "left" | "right" | "up" | "down";

function move(direction: Direction) {
  console.log(direction);
}

move("left");
move("up");

// This would be an error:
// move("forward");

// Expected output:
// left
// up


// =======================================================
// Example 5: Literal type inside object type
// =======================================================

type Button = {
  label: string;
  variant: "primary" | "secondary" | "danger";
};

const saveButton: Button = {
  label: "Save",
  variant: "primary",
};

const deleteButton: Button = {
  label: "Delete",
  variant: "danger",
};

console.log(saveButton.label);
console.log(saveButton.variant);
console.log(deleteButton.label);
console.log(deleteButton.variant);

// Expected output:
// Save
// primary
// Delete
// danger


// =======================================================
// Example 6: Type narrowing with literal types
// =======================================================

function printStatus(status: Status) {
  if (status === "loading") {
    console.log("Loading...");
  }

  if (status === "success") {
    console.log("Success!");
  }

  if (status === "error") {
    console.log("Something went wrong.");
  }
}

printStatus("loading");
printStatus("success");
printStatus("error");

// Expected output:
// Loading...
// Success!
// Something went wrong.


// =======================================================
// Example 7: Boolean literal type
// =======================================================

let isReady: true = true;

// This would be an error:
// isReady = false;

console.log(isReady);

// Expected output:
// true


// =======================================================
// Example 8: Number literal union
// =======================================================

let dice: 1 | 2 | 3 | 4 | 5 | 6 = 1;

console.log(dice);

dice = 6;

console.log(dice);

// This would be an error:
// dice = 10;

// Expected output:
// 1
// 6


// =======================================================
// Example 9: Reusable type alias
// =======================================================

type Theme = "light" | "dark";

function setTheme(theme: Theme) {
  console.log(theme);
}

function showTheme(theme: Theme) {
  console.log(theme);
}

setTheme("light");
showTheme("dark");

// This would be an error:
// setTheme("blue");

// Expected output:
// light
// dark


// =======================================================
// Example 10: Literal type with array of objects
// =======================================================

type Task = {
  title: string;
  status: "todo" | "in-progress" | "done";
};

const tasks: Task[] = [
  { title: "Learn TypeScript", status: "in-progress" },
  { title: "Practice exercises", status: "todo" },
  { title: "Commit milestone", status: "done" },
];

const doneTasks = tasks.filter((task) => {
  return task.status === "done";
});

console.log(doneTasks);

// Expected output:
// [ { title: 'Commit milestone', status: 'done' } ]


// =======================================================
// Example 11: Destructuring with literal typed objects
// =======================================================

const todoTasks = tasks.filter(({ status }) => {
  return status === "todo";
});

console.log(todoTasks);

// Expected output:
// [ { title: 'Practice exercises', status: 'todo' } ]