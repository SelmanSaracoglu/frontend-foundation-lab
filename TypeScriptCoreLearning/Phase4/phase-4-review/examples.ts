// phase-4-review/examples.ts

// NOTE:
// Bu dosya Phase 4 konularını tek bir küçük gerçekçi modelde birleştirir.
// Gerçek projede bu kodlar birden fazla dosyaya bölünebilir.

// --------------------------------------------------
// Generic API types
// --------------------------------------------------

type ApiResponse<T> = {
  success: boolean;
  data: T;
  requestId: string;
};

type ApiError = {
  code: string;
  message: string;
};

type ApiResult<TData, TError = ApiError> =
  | {
      success: true;
      data: TData;
      requestId: string;
    }
  | {
      success: false;
      error: TError;
      requestId: string;
    };

// --------------------------------------------------
// Runtime constants + typeof + indexed access
// --------------------------------------------------

const TASK_STATUSES = ["todo", "in_progress", "done"] as const;

type TaskStatus = (typeof TASK_STATUSES)[number];

const TASK_PRIORITIES = ["low", "medium", "high"] as const;

type TaskPriority = (typeof TASK_PRIORITIES)[number];

// --------------------------------------------------
// Domain model
// --------------------------------------------------

type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  createdAt: string;
  updatedAt: string;
};

// --------------------------------------------------
// Utility types
// --------------------------------------------------

type PublicTask = Pick<Task, "id" | "title" | "status" | "priority">;

type CreateTaskRequest = Pick<
  Task,
  "title" | "description" | "priority" | "assigneeId"
>;

type UpdateTaskRequest = Partial<
  Pick<Task, "title" | "description" | "status" | "priority">
>;

type TaskSortableField = keyof Pick<Task, "title" | "status" | "priority">;

type TaskEditableValue = Task["title" | "description" | "status" | "priority"];

// --------------------------------------------------
// Record<K, T>
// --------------------------------------------------

const taskStatusLabels: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

const taskPriorityRiskLevels: Record<TaskPriority, "low" | "medium" | "high"> = {
  low: "low",
  medium: "medium",
  high: "high",
};

// --------------------------------------------------
// Generic helpers with keyof and indexed access
// --------------------------------------------------

function getValue<T, K extends keyof T>(item: T, key: K): T[K] {
  return item[key];
}

function setValue<T, K extends keyof T>(item: T, key: K, value: T[K]): T {
  return {
    ...item,
    [key]: value,
  };
}

function mapById<T extends { id: string }>(items: T[]): Record<string, T> {
  const result: Record<string, T> = {};

  for (const item of items) {
    result[item.id] = item;
  }

  return result;
}

// --------------------------------------------------
// Application functions
// --------------------------------------------------

function createTask(request: CreateTaskRequest): Task {
  const now = new Date().toISOString();

  return {
    id: "task-1",
    title: request.title,
    description: request.description,
    status: "todo",
    priority: request.priority,
    assigneeId: request.assigneeId,
    createdAt: now,
    updatedAt: now,
  };
}

function updateTask(task: Task, request: UpdateTaskRequest): Task {
  return {
    ...task,
    ...request,
    updatedAt: new Date().toISOString(),
  };
}

function toPublicTask(task: Task): PublicTask {
  return {
    id: task.id,
    title: task.title,
    status: task.status,
    priority: task.priority,
  };
}

function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
    requestId: "req-123",
  };
}

// --------------------------------------------------
// Example usage
// --------------------------------------------------

const task = createTask({
  title: "Review TypeScript generics",
  description: "Practice reusable type structures",
  priority: "medium",
  assigneeId: "u1",
});

console.log(task.status);
// Expected output: "todo"

const updatedTask = updateTask(task, {
  status: "in_progress",
  priority: "high",
});

console.log(updatedTask.status);
console.log(updatedTask.priority);
// Expected output:
// "in_progress"
// "high"

const publicTask = toPublicTask(updatedTask);

console.log(publicTask);
// Expected output:
// {
//   id: "task-1",
//   title: "Review TypeScript generics",
//   status: "in_progress",
//   priority: "high"
// }

const taskTitle = getValue(updatedTask, "title");
const taskStatus = getValue(updatedTask, "status");

console.log(taskTitle);
console.log(taskStatus);
// Expected output:
// "Review TypeScript generics"
// "in_progress"

const renamedTask = setValue(updatedTask, "title", "Finish Phase 4 review");

console.log(renamedTask.title);
// Expected output: "Finish Phase 4 review"

const tasksById = mapById([task, updatedTask, renamedTask]);

console.log(tasksById["task-1"]?.title);
// Expected output depends on last stored object with same id:
// "Finish Phase 4 review"

const response = createSuccessResponse(publicTask);

console.log(response.data.title);
// Expected output: "Review TypeScript generics"

const result: ApiResult<PublicTask> = {
  success: true,
  data: publicTask,
  requestId: "req-456",
};

if (result.success) {
  console.log(result.data.status);
}
// Expected output: "in_progress"

const sortField: TaskSortableField = "priority";

console.log(sortField);
// Expected output: "priority"

const editableValue: TaskEditableValue = "done";

console.log(editableValue);
// Expected output: "done"

console.log(taskStatusLabels.done);
// Expected output: "Done"

console.log(taskPriorityRiskLevels.high);
// Expected output: "high"

// These would not compile:
//
// const invalidStatus: TaskStatus = "blocked";
//
// const invalidSortField: TaskSortableField = "createdAt";
//
// setValue(updatedTask, "priority", "urgent");
//
// getValue(updatedTask, "missingField");