// 09-enums/examples.ts

// =======================================================
// Example 1: Basic string enum
// =======================================================

enum Status {
  Loading = "loading",
  Success = "success",
  Error = "error",
}

let currentStatus: Status = Status.Loading;

console.log(currentStatus);

currentStatus = Status.Success;

console.log(currentStatus);

// Expected output:
// loading
// success


// =======================================================
// Example 2: Enum as function parameter
// =======================================================

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
move(Direction.Down);

// Expected output:
// left
// down


// =======================================================
// Example 3: Enum inside object type
// =======================================================

enum UserRole {
  Admin = "admin",
  Editor = "editor",
  Viewer = "viewer",
}

type User = {
  name: string;
  role: UserRole;
};

const user: User = {
  name: "Ada",
  role: UserRole.Admin,
};

console.log(user.name);
console.log(user.role);

// Expected output:
// Ada
// admin


// =======================================================
// Example 4: Enum with array of objects
// =======================================================

enum TaskStatus {
  Todo = "todo",
  InProgress = "in-progress",
  Done = "done",
}

type Task = {
  title: string;
  status: TaskStatus;
};

const tasks: Task[] = [
  { title: "Learn enums", status: TaskStatus.Done },
  { title: "Practice TypeScript", status: TaskStatus.InProgress },
  { title: "Commit changes", status: TaskStatus.Todo },
];

const doneTasks = tasks.filter((task) => {
  return task.status === TaskStatus.Done;
});

console.log(doneTasks);

// Expected output:
// [ { title: 'Learn enums', status: 'done' } ]


// =======================================================
// Example 5: Destructuring with enum values
// =======================================================

const todoTasks = tasks.filter(({ status }) => {
  return status === TaskStatus.Todo;
});

console.log(todoTasks);

// Expected output:
// [ { title: 'Commit changes', status: 'todo' } ]