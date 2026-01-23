import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { taskSchema } from "@/lib/schemas/taskSchema";

let tasks = [
  { id: 1, title: "Fix middleware", description: "Add JWT validation", status: "IN_PROGRESS", userId: 1 },
  { id: 2, title: "Update schema", description: "Add task validation", status: "PENDING", userId: 2 },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const start = (page - 1) * limit;
  const paginatedTasks = tasks.slice(start, start + limit);

  return NextResponse.json({
    page,
    limit,
    data: paginatedTasks,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = taskSchema.parse(body);

    const newTask = {
      id: tasks.length + 1,
      title: data.title,
      description: data.description || "",
      status: data.status,
      userId: data.userId,
    };

    tasks.push(newTask);

    return NextResponse.json(
      { success: true, message: "Task created", data: newTask },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation Error",
          errors: error.issues.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal Error" },
      { status: 500 }
    );
  }
}