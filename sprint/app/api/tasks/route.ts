import { NextResponse } from 'next/server';

let tasks = [
  { id: 1, title: 'Learn Next.js', completed: false },
  { id: 2, title: 'Build REST API', completed: true },
];

// GET /api/tasks
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  const start = (page - 1) * limit;
  const data = tasks.slice(start, start + limit);

  return NextResponse.json({
    page,
    limit,
    data,
  });
}

// POST /api/tasks
export async function POST(req: Request) {
  const body = await req.json();

  if (!body.title) {
    return NextResponse.json(
      { error: 'Title is required' },
      { status: 400 }
    );
  }

  const newTask = {
    id: tasks.length + 1,
    title: body.title,
    completed: false,
  };

  tasks.push(newTask);

  return NextResponse.json(
    { message: 'Task created', data: newTask },
    { status: 201 }
  );
}
