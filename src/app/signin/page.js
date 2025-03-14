'use client';
import { signIn } from 'next-auth/react';

export default function Page() {
    const handleSignIn = () => {
        // Use NextAuth's signIn function with "google" as the provider
        signIn('google', { callbackUrl: '/dashboard' });
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-[#4285F4] via-[#DB4437] to-[#F4B400]">
            <div className="w-full max-w-sm bg-white shadow-lg p-8 rounded-lg">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Sign In</h2>
                <button
                    onClick={handleSignIn}
                    className="w-full border border-gray-300 py-2 rounded hover:bg-gray-100 text-gray-900 transition"
                >
                    Sign In with Google
                </button>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don’t have an account?{' '}
                    <a href="#" className="text-[#4285F4] hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
