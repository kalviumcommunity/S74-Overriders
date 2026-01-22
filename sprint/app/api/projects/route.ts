import { NextResponse } from 'next/server';

let projects = [{ id: 1, title: 'Website Redesign' }];

export async function GET() {
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.title) {
    return NextResponse.json(
      { error: 'Title required' },
      { status: 400 }
    );
  }

  const project = {
    id: projects.length + 1,
    title: body.title,
  };

  projects.push(project);

  return NextResponse.json(project, { status: 201 });
}
