import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Gratitude from '@/models/Gratitude';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const entries = await Gratitude.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(10);

    return NextResponse.json(entries);
  } catch (error) {
    console.error('Gratitude API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gratitude entries' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    if (!body.content?.trim()) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const entry = await Gratitude.create({
      content: body.content.trim(),
      userId: session.user.id,
    });

    return NextResponse.json(entry);
  } catch (error) {
    console.error('Gratitude API Error:', error);
    return NextResponse.json(
      { error: 'Failed to create gratitude entry' },
      { status: 500 }
    );
  }
} 