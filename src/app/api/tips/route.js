import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Tip from '@/models/Tip';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const tips = await Tip.find()
      .sort({ createdAt: -1 })
      .limit(5);

    return NextResponse.json(tips);
  } catch (error) {
    console.error('Tips API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch tips' }, { status: 500 });
  }
} 