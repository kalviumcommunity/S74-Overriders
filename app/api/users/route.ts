import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  return NextResponse.json({
    page,
    limit,
    data: users,
  });
}

import { NextResponse } from "next/server";
import redis from "@/lib/redis";
import prisma from "@/lib/prisma";

export async function GET() {
  const cacheKey = "users:list";

  // 1️⃣ Try Redis first
  const cached = await redis.get(cacheKey);

  if (cached) {
    console.log("⚡ Cache Hit");
    return NextResponse.json(JSON.parse(cached));
  }

  console.log("🐢 Cache Miss - Fetching from DB");

  // 2️⃣ Fetch from DB
  const users = await prisma.user.findMany();

  // 3️⃣ Store in cache with TTL
  await redis.set(cacheKey, JSON.stringify(users), "EX", 60);

  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();

  const user = await prisma.user.create({
    data: body,
  });

  // 🔥 Invalidate cache
  await redis.del("users:list");
  console.log("🧹 Cache invalidated");

  return NextResponse.json(user, { status: 201 });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.name) {
    return NextResponse.json(
      { error: 'Name is eequired' },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: 'User created', data: body },
    { status: 201 }
  );
}


