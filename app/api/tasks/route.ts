import { NextResponse } from 'next/server';

export async function GET() {
  const tasks = [
    { id: 1, title: 'Learn Next.js' },
    { id: 2, title: 'Build API routes' },
  ];

  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.title) {
    return NextResponse.json(
      { error: 'Task title is required' },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: 'Task created', data: body },
    { status: 201 }
  );
}
