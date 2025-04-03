'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import CalendarWidget from '@/components/CalendarWidget';
import ExerciseWidget from '@/components/ExerciseWidget';
import MoodTracker from '@/components/MoodTracker';
import BreathingExercise from '@/components/BreathingExercise';
import MeditationTimer from '@/components/MeditationTimer';
import GratitudeJournal from '@/components/GratitudeJournal';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tipsRes = await fetch('/api/tips');
        const tipsData = await tipsRes.json();
        setTips(Array.isArray(tipsData) ? tipsData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setTips([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchData();
    }
  }, [status]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('http://localhost:3000/');
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between h-auto sm:h-16">
            <div className="flex items-center mb-2 sm:mb-0">
              <span className="text-2xl font-bold text-green-600">ZenMind</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              {session?.user?.image && (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full sm:m-3"
                />
              )}
              <span className="text-gray-700">{session?.user?.name}</span>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="py-6 sm:px-0">
          {/* Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <MoodTracker />
            </div>
            <div className="lg:col-span-1">
              <CalendarWidget />
            </div>
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-1">
              <BreathingExercise />
            </div>
            <div className="lg:col-span-2">
              <MeditationTimer />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ExerciseWidget />
            </div>
            <div className="lg:col-span-1">
              <GratitudeJournal />
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-black">Daily Tips</h2>
              <div className="space-y-4">
                {tips && tips.length > 0 ? (
                  tips.map((tip) => (
                    <div key={tip._id} className="border rounded-lg p-4">
                      <h3 className="font-semibold">{tip.title}</h3>
                      <p className="text-gray-600 mt-2">{tip.content}</p>
                      <span className="mt-2 inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {tip.category}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-black text-center py-4">No tips available at the moment.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}