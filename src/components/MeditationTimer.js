'use client';
import { useState, useEffect } from 'react';

export default function MeditationTimer() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [totalSessions, setTotalSessions] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [showBreathingGuide, setShowBreathingGuide] = useState(false);
  const [totalTime, setTotalTime] = useState(300); // Track total selected time

  const durations = [
    { label: '5 min', value: 300 },
    { label: '10 min', value: 600 },
    { label: '15 min', value: 900 },
    { label: '20 min', value: 1200 },
    { label: '30 min', value: 1800 },
  ];

  // Calculate progress (inverted because we want to show time remaining)
  const progress = (timeLeft / totalTime) * 100;

  // Timer logic
  useEffect(() => {
    let timer;
    if (isActive && !isPaused) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            setTotalSessions(prev => prev + 1);
            setTotalMinutes(prev => prev + Math.floor(totalTime / 60));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, isPaused, totalTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDurationChange = (value) => {
    setTimeLeft(value);
    setTotalTime(value); // Set the total time when duration changes
    setIsActive(false);
    setIsPaused(false);
  };

  const getBreathingText = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'rest': return 'Rest';
      default: return '';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 pb-14"> 
      <h2 className="text-xl font-semibold mb-6 text-black">Meditation Timer</h2>
      
      <div className="flex flex-col items-center space-y-8">
        {/* Timer Display */}
        <div className="relative w-full max-w-md">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 text-center">
            <span className="text-5xl font-bold text-black">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Duration Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          {durations.map((duration) => (
            <button
              key={duration.value}
              onClick={() => handleDurationChange(duration.value)}
              className={`px-4 py-2 rounded-md ${
                timeLeft === duration.value
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              {duration.label}
            </button>
          ))}
        </div>

        {/* Control Button */}
        <button
          onClick={() => setIsActive(!isActive)}
          className="px-8 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {isActive ? 'Stop' : 'Start'}
        </button>

        {/* Breathing Guide Toggle */}
        <button
          onClick={() => setShowBreathingGuide(!showBreathingGuide)}
          className={`px-4 py-2 rounded-md ${
            showBreathingGuide
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-black hover:bg-gray-200'
          }`}
        >
          Show Breathing Guide
        </button>

        {/* Stats */}
        <div className="text-center text-gray-600">
          <p>Total Sessions: {totalSessions}</p>
          <p>Total Minutes: {totalMinutes}</p>
        </div>
      </div>
    </div>
  );
}
