import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { userSchema } from "@/lib/schemas/userSchema";

let users = [
  { id: 1, name: "John", email: "john@example.com", age: 25 },
  { id: 2, name: "Jane", email: "jane@example.com", age: 30 },
];

// POST /api/users
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Zod validation happens HERE
    const data = userSchema.parse(body);

    const newUser = {
      id: users.length + 1,
      name: data.name,
      email: data.email,
      age: data.age,
    };

    users.push(newUser);

    return NextResponse.json(
      { success: true, message: "User created", data: newUser },
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
