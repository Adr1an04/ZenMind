'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import Cat from '/public/kitten1.jpg';

export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignIn = async () => {
        try {
            setIsLoading(true);
            setErrorMessage('');
            
            await signIn('google', {
                callbackUrl: 'http://localhost:3000/dashboard',
            });
        } catch (error) {
            console.error('Sign in error:', error);
            setErrorMessage('An error occurred during sign in. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-64 md:h-96 w-full">
                    <Image 
                        src={Cat}
                        alt="Cat illustration" 
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <div className="space-y-8">
                    <div className="text-center md:text-left">
                    </div>
                    <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10">
                        {errorMessage && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600">{errorMessage}</p>
                            </div>
                        )}
                        <div className="mt-6">
                            <h2 className="text-4xl font-extrabold text-gray-900 text-center">
                                Welcome Back
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 text-center mb-4">
                                Sign in to continue your journey to mindfulness
                            </p>
                            <button
                                onClick={handleSignIn}
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-50"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-green-500 group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                {isLoading ? 'Signing in...' : 'Sign in with Google'}
                            </button>
                        </div>
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        Continue your path to peace
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
