'use client';
import { useState } from 'react';

export default function ExerciseWidget() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [step, setStep] = useState(0);

  const exercises = [
    {
      id: 'progressive-relaxation',
      title: 'Progressive Muscle Relaxation',
      description: 'Tense and relax each muscle group to release physical tension.',
      steps: [
        'Find a comfortable position and take a few deep breaths.',
        'Starting with your feet, tense the muscles for 5 seconds.',
        'Release the tension and notice the feeling of relaxation.',
        'Move up to your calves and repeat.',
        'Continue with thighs, buttocks, abdomen, chest, arms, hands, neck, and face.',
        'Take a final deep breath and notice how relaxed your body feels.',
      ],
      duration: '10-15 minutes',
    },
    {
      id: 'stretching',
      title: 'Gentle Stretching',
      description: 'Simple stretches to relieve tension and improve circulation.',
      steps: [
        'Start with neck rolls: gently roll your head in circles.',
        'Shoulder shrugs: lift shoulders up and down slowly.',
        'Arm circles: rotate arms in small circles.',
        'Cat-cow stretch: on all fours, alternate between arching and rounding your back.',
        'Child\'s pose: sit back on your heels with arms stretched forward.',
        'Take deep breaths throughout each stretch.',
      ],
      duration: '5-10 minutes',
    },
    {
      id: 'mindful-walking',
      title: 'Mindful Walking',
      description: 'A walking meditation to connect with your body and surroundings.',
      steps: [
        'Find a quiet space to walk slowly.',
        'Focus on the sensation of your feet touching the ground.',
        'Notice the movement of your legs and arms.',
        'Pay attention to your breathing as you walk.',
        'Observe your surroundings without judgment.',
        'Continue for 5-10 minutes, maintaining awareness.',
      ],
      duration: '5-10 minutes',
    },
    {
      id: 'yoga',
      title: 'Quick Yoga Flow',
      description: 'Simple yoga poses to reduce stress and tension.',
      steps: [
        'Start in mountain pose: stand tall with feet together.',
        'Move to cat-cow: on all fours, alternate between arching and rounding your back.',
        'Downward dog: lift hips up, forming an inverted V.',
        'Warrior I: step one foot forward, raise arms overhead.',
        'Child\'s pose: sit back on heels with arms stretched forward.',
        'End in savasana: lie flat on your back, arms at sides.',
      ],
      duration: '10-15 minutes',
    },
  ];

  const startExercise = (exercise) => {
    setSelectedExercise(exercise);
    setStep(0);
    setIsActive(true);
  };

  const nextStep = () => {
    if (step < selectedExercise.steps.length - 1) {
      setStep(step + 1);
    } else {
      setIsActive(false);
      setSelectedExercise(null);
    }
  };

  const previousStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-black">Stress Management Exercises</h2>
      
      {!isActive ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
            >
              <h3 className="font-semibold text-lg mb-2 text-black">{exercise.title}</h3>
              <p className="text-black mb-4">{exercise.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-black">{exercise.duration}</span>
                <button
                  onClick={() => startExercise(exercise)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2 text-black">{selectedExercise.title}</h3>
            <p className="text-black mb-4">{selectedExercise.description}</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-black">Step {step + 1} of {selectedExercise.steps.length}</span>
                <span className="text-sm text-black">{selectedExercise.duration}</span>
              </div>
              <div className="w-full bg-white border rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((step + 1) / selectedExercise.steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <p className="text-lg mb-6 text-black">{selectedExercise.steps[step]}</p>
            <div className="flex justify-between">
              <button
                onClick={previousStep}
                disabled={step === 0}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {step === selectedExercise.steps.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 