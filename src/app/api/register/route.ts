import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Forward the request to the backend
  const response = await fetch('http://52.63.161.197/api/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),  // Forwarding the body data
  });

  const data = await response.json();

  // Return the backend response to the frontend
  return NextResponse.json(data);
}
