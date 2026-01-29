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
