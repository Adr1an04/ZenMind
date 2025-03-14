"use client";

import { signIn } from "next-auth/react";

export default function Page() {
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-[#4285F4] via-[#DB4437] to-[#F4B400]">
                <div className="w-full max-w-sm bg-white shadow-lg p-8 rounded-lg relative">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Sign Up To Zenmind</h2>
                    <button
                        onClick={() => signIn("google")}
                        className="w-full border border-gray-300 py-2 rounded hover:bg-gray-100 text-gray-900 transition"
                    >
                        Sign Up with Google
                    </button>
                </div>
                <div className="w-full max-w-sm bg-white shadow-lg p-8 rounded-lg mt-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">How It Works</h3>
                    <p className="text-sm text-gray-600">
                        We work with Google to provide a fast and secure way to sign in and create an account. Simply connect your Google account and get started!
                    </p>
                </div>
            </div>
        </div>
    );
}
