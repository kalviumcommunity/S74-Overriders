import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import redis from "@/lib/redis";

export async function GET() {
  const cacheKey = "users:list";

  // Check cache
  const cachedUsers = await redis.get(cacheKey);
  if (cachedUsers) {
    console.log("⚡ Cache Hit");
    return NextResponse.json(JSON.parse(cachedUsers));
  }

  // Cache miss → DB
  console.log("Cache Miss - Fetching from DB");
  const users = await prisma.user.findMany();

  // Save to cache with TTL
  await redis.set(cacheKey, JSON.stringify(users), "EX", 60);

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Create user in database
    const user = await prisma.user.create({
      data: { name, email },
    });

    // Invalidate cache
    await redis.del("users:list");
    console.log("🗑️ Cache invalidated after user creation");

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
