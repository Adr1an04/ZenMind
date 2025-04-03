'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function MoodTracker() {
  const { data: session } = useSession();
  const [selectedMood, setSelectedMood] = useState(null);
  const [stressLevel, setStressLevel] = useState(5);
  const [notes, setNotes] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [error, setError] = useState('');

  const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😌', label: 'Calm' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😕', label: 'Sad' },
    { emoji: '😤', label: 'Frustrated' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '😰', label: 'Anxious' },
    { emoji: '😡', label: 'Angry' },
  ];

  useEffect(() => {
    if (session) {
      fetchMoodHistory();
    }
  }, [session]);

  const fetchMoodHistory = async () => {
    try {
      const response = await fetch('/api/moods');
      if (!response.ok) throw new Error('Failed to fetch moods');
      const data = await response.json();
      setMoodHistory(data);
    } catch (err) {
      setError('Failed to fetch moods');
      console.error('Error fetching moods:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMood) return;

    try {
      const response = await fetch('/api/moods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood: selectedMood.label,
          emoji: selectedMood.emoji,
          stressLevel,
          notes,
        }),
      });

      if (!response.ok) throw new Error('Failed to save mood');

      setMoodHistory([...moodHistory, {
        mood: selectedMood.label,
        emoji: selectedMood.emoji,
        stressLevel,
        notes,
        createdAt: new Date().toISOString(),
      }]);

      setSelectedMood(null);
      setStressLevel(5);
      setNotes('');
    } catch (err) {
      setError('Failed to save mood');
      console.error('Error saving mood:', err);
    }
  };

  if (!session) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6 text-black">Track Your Mood</h2>
        <p className="text-black">Please sign in to track your mood.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-black">Track Your Mood</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4 text-black">How are you feeling?</h3>
          <div className="grid grid-cols-4 gap-4">
            {moods.map((mood) => (
              <button
                key={mood.label}
                type="button"
                onClick={() => setSelectedMood(mood)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedMood?.label === mood.label
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-3xl mb-2 block">{mood.emoji}</span>
                <span className="text-sm text-black">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 text-black">Stress Level (1-10)</h3>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-black">Low</span>
            <input
              type="range"
              min="1"
              max="10"
              value={stressLevel}
              onChange={(e) => setStressLevel(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm text-black">High</span>
          </div>
          <div className="text-center mt-2">
            <span className="text-2xl font-bold text-black">{stressLevel}</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 text-black">Notes (optional)</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How are you feeling today?"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
            rows="3"
          />
        </div>

        <button
          type="submit"
          disabled={!selectedMood}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Save Mood
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4 text-black">Mood History</h3>
        {moodHistory.length === 0 ? (
          <p className="text-black">No mood history yet</p>
        ) : (
          <div className="space-y-4">
            {moodHistory.map((entry, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{entry.emoji}</span>
                  <div>
                    <p className="font-medium text-black">{entry.mood}</p>
                    <p className="text-sm text-black">
                      Stress Level: {entry.stressLevel}/10
                    </p>
                    {entry.notes && (
                      <p className="text-sm text-black mt-1">{entry.notes}</p>
                    )}
                  </div>
                </div>
                <span className="text-sm text-black">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 