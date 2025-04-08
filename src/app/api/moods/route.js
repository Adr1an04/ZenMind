import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Mood from '@/models/Mood';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const moods = await Mood.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(10);

    return NextResponse.json(moods);
  } catch (error) {
    console.error('Moods API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch moods' },
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
    
    if (!body.mood || !body.stressLevel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const mood = await Mood.create({
      ...body,
      userId: session.user.id,
    });

    return NextResponse.json(mood);
  } catch (error) {
    console.error('Moods API Error:', error);
    return NextResponse.json(
      { error: 'Failed to create mood' },
      { status: 500 }
    );
  }
} 
