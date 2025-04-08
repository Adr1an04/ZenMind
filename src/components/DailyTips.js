'use client';
import { useState, useEffect } from 'react';

export default function DailyTip() {
  const [tip, setTip] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Local array of tips
  const tips = [
    "Take a 5-minute break every hour to reset your mind and focus.",
    "Start your day with a prioritized to-do list.",
    "Practice deep breathing when feeling overwhelmed.",
    "Use the Pomodoro technique: 25 mins work, 5 mins break.",
    "Avoid too much multitasking — focus on completing one task at a time.",
    "Get at least 7 hours of sleep tonight.",
    "Say no to unnecessary commitments to protect your time.",
    "Do some light stretching to start your day.",
    "Go for a short walk during study breaks to clear your mind.",
    "Limit screen time before bed to improve sleep quality.",
    "Organize your workspace to reduce distractions.",
    "Do some light exercise to get your blood flowing before doing work.",
    "Make sure to stay hydrated throughout the day.",
    "Break big tasks into smaller chunks.",
    "Set realistic goals for the day.",
    "Compliment 3 strangers today - lifting others can lift you too.",
    "Don't skip meals.",
    "Maintain good posture when sitting and standing - don't slouch.",
    "Give 110% effort in everything you do today.",
    "Don't let your mistakes set you back, learn from them and grow."
  ];

  // Logic to select a tip based on the day of the year
  const getDailyTip = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return tips[dayOfYear % tips.length];
  };

  useEffect(() => {
    const todayTip = getDailyTip();
    setTip(todayTip);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-black">Daily Tip</h2>
      <p className="text-gray-800 text-lg italic">“{tip}”</p>
      <div className="mt-4 text-sm text-gray-500">
        {new Date().toLocaleDateString()}
      </div>
    </div>
  );
}