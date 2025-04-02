'use client';
import { useState, useEffect } from 'react';

export default function GratitudeJournal() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/gratitude');
      if (!response.ok) {
        throw new Error('Failed to fetch gratitude entries');
      }
      const data = await response.json();
      setEntries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching gratitude entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEntry.trim()) return;

    try {
      const response = await fetch('/api/gratitude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newEntry }),
      });

      if (!response.ok) {
        throw new Error('Failed to save gratitude entry');
      }

      const entry = await response.json();
      setEntries(prev => [entry, ...prev]);
      setNewEntry('');
    } catch (error) {
      console.error('Error saving gratitude entry:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-black">Gratitude Journal</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="What are you grateful for?"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <div
              key={entry._id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <p className="text-black">{entry.content}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>
                <span className="text-2xl">🙏</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">
            Start your gratitude journey by adding your first entry!
          </p>
        )}
      </div>
    </div>
  );
} 