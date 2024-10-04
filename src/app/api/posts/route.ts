import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/notion';

export async function GET() {
  try {
    const posts = await getDatabase();
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}