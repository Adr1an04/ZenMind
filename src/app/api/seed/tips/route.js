import { connectToDatabase } from '@/lib/mongodb';
import Tip from '@/models/Tip';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Attempting to connect to database...');
    await connectToDatabase();
    console.log('Database connection successful');

    // Delete existing tips
    console.log('Deleting existing tips...');
    const deleteResult = await Tip.deleteMany({});
    console.log('Deleted tips count:', deleteResult.deletedCount);

    // Initial tips data
    const tipsData = [
      {
        title: 'Morning Meditation',
        content: 'Start your day with 5 minutes of mindful breathing. Morning meditation can help set a positive tone for the entire day.',
        category: 'meditation',
      },
      {
        title: 'Mindful Walking',
        content: 'Try walking meditation by focusing on each step. Feel the sensation of your feet touching the ground and maintain awareness of your surroundings.',
        category: 'mindfulness',
      },
      {
        title: 'Stress Relief Technique',
        content: 'When feeling stressed, practice the 4-7-8 breathing technique: Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds.',
        category: 'breathing',
      },
      {
        title: 'Evening Reflection',
        content: "Before bed, spend a few minutes reflecting on three things you're grateful for. This practice can improve sleep and overall well-being.",
        category: 'gratitude',
      },
      {
        title: 'Mindful Eating',
        content: 'Practice mindful eating by focusing on the taste, texture, and aroma of your food. This can improve digestion and prevent overeating.',
        category: 'lifestyle',
      },
    ];

    // Insert tips
    console.log('Inserting new tips...');
    const insertResult = await Tip.insertMany(tipsData);
    console.log('Inserted tips count:', insertResult.length);

    return NextResponse.json({ 
      message: 'Tips seeded successfully',
      deletedCount: deleteResult.deletedCount,
      insertedCount: insertResult.length
    });
  } catch (error) {
    console.error('Detailed seeding error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json({ 
      error: 'Failed to seed tips',
      details: error.message
    }, { status: 500 });
  }
} 