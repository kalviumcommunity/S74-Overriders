import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { userSchema } from "@/lib/schemas/userSchema";
import { taskSchema } from "@/lib/schemas/taskSchema";
import { handleError } from "@/lib/errorHandler";

let users = [
  { id: 1, name: "John", email: "john@example.com", age: 25 },
  { id: 2, name: "Jane", email: "jane@example.com", age: 30 }
];

let tasks = [
  { id: 1, title: "Fix middleware", description: "Add JWT validation", status: "IN_PROGRESS", userId: 1 },
  { id: 2, title: "Update schema", description: "Add task validation", status: "PENDING", userId: 2 }
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const start = (page - 1) * limit;

  return NextResponse.json({
    success: true,
    data: tasks.slice(start, start + limit)
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const userData = userSchema.parse(body);
    const newUser = {
      id: users.length + 1,
      ...userData
    };
    users.push(newUser);

    const taskData = taskSchema.parse(body);
    const newTask = {
      id: tasks.length + 1,
      title: taskData.title,
      description: taskData.description || "",
      status: taskData.status,
      userId: taskData.userId
    };
    tasks.push(newTask);

    return NextResponse.json(
      { success: true, message: "Task created", data: newTask },
      { status: 201 }
    );
  } catch (err) {
    return handleError(err);
  }
}
