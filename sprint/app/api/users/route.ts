import { NextResponse } from "next/server";
import { userSchema } from "@/lib/schemas/userSchema";
import { handleError } from "@/lib/errorHandler";

let users = [
  { id: 1, name: "John", email: "john@example.com", age: 25 },
  { id: 2, name: "Jane", email: "jane@example.com", age: 30 },
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = userSchema.parse(body);

    const newUser = {
      id: users.length + 1,
      ...data,
    };

    users.push(newUser);

    return NextResponse.json(
      { success: true, data: newUser },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "POST /api/users");
  }
}
