'use client';
import { useState, useEffect } from 'react';

export default function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [pattern, setPattern] = useState('4-7-8'); // inhale-hold-exhale
  const [currentPhase, setCurrentPhase] = useState('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [isPaused, setIsPaused] = useState(false);

  const patterns = {
    '4-7-8': { inhale: 4, hold: 7, exhale: 8 },
    '4-4-4': { inhale: 4, hold: 4, exhale: 4 },
    '5-5-5': { inhale: 5, hold: 5, exhale: 5 },
  };

  useEffect(() => {
    let timer;
    if (isActive && !isPaused) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (currentPhase === 'inhale') {
              setCurrentPhase('hold');
              return patterns[pattern].hold;
            } else if (currentPhase === 'hold') {
              setCurrentPhase('exhale');
              return patterns[pattern].exhale;
            } else {
              setCurrentPhase('inhale');
              return patterns[pattern].inhale;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, currentPhase, pattern, isPaused]);

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'inhale':
        return 'bg-green-500';
      case 'hold':
        return 'bg-blue-500';
      case 'exhale':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'inhale':
        return 'Inhale';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Exhale';
      default:
        return 'Ready';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-black">Breathing Exercise</h2>
      
      <div className="flex flex-col items-center space-y-6">
        <div className="flex space-x-4 mb-6">
          {Object.keys(patterns).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPattern(p);
                setTimeLeft(patterns[p].inhale);
                setCurrentPhase('inhale');
              }}
              className={`px-4 py-2 rounded-md ${
                pattern === p
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="relative w-48 h-48">
  <div className={`w-full h-full rounded-full ${getPhaseColor()} flex items-center justify-center`}>
    <div
      className="absolute rounded-full bg-white opacity-20"
      style={{
        width: `${(timeLeft / patterns[pattern][currentPhase]) * 100}%`,
        height: `${(timeLeft / patterns[pattern][currentPhase]) * 100}%`,
        transition: 'width 1s linear, height 1s linear',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
    <div className="absolute text-white text-2xl font-semibold">
      {timeLeft}
    </div>
  </div>
</div>

        <div className="text-xl font-medium text-black">{getPhaseText()}</div>

        <div className="flex space-x-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {isActive ? 'Stop' : 'Start'}
          </button>
          {isActive && (
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 