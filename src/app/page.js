import Image from "next/image";
import Link from "next/link";
import Cat from "/public/cat.jpg";
import Google from "/public/google-icon.svg";

export default function LandingPage() {
  return (
    <div className="min-h-screen  bg-gray-50">
      {/* Nav */}
      <nav className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-green-600">ZenMind</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your Inner Peace with 
              <span className="text-green-600"> ZenMind</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your personalized stress management companion. Connect seamlessly with Google 
              start your journey to better mental health.
            </p>
            
            {/* Sign in buttons*/}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup" className="bg-green-600 text-white px-10 py-4 rounded-lg 
                text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg
                flex items-center justify-center gap-8">
                <Image 
                  src={Google} 
                  alt="Google" 
                  width={60} 
                  height={60}
                />
                Get Started with Google
              </Link>
              
              <Link href="/signin" className="border-2 border-green-600 text-green-600 px-5 py-4 rounded-lg 
                text-lg font-semibold hover:bg-indigo-50 transition-colors
                flex items-center justify-center gap-2">
                Already have an account? Sign In
              </Link>
            </div>
          </div>

          {/* Right side */}
          <div className="flex-1">
            <div className="relative w-full h-96 bg-indigo-50 rounded-3xl overflow-hidden">
              <div className="absolute inset-0">
                <Image 
                  src={Cat}
                  alt="Cat illustration" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl mb-4 flex items-center justify-center">
              📅
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-600">Daily Check-ins</h3>
            <p className="text-gray-600">Track your stress levels and mood with simple daily assessments</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl mb-4 flex items-center justify-center">
              🧠
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-600">Personalized Exercises</h3>
            <p className="text-gray-600">AI-powered mindfulness exercises tailored to your needs</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl mb-4 flex items-center justify-center">
              🔒
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-600">Secure Integration</h3>
            <p className="text-gray-600">Google Calendar integration with end-to-end encryption</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center text-gray-600">
            © 2025 ZenMind. All rights reserved. 
            <a href="#" className="text-green-600 hover:underline ml-4">Terms</a>
            <a href="#" className="text-green-600 hover:underline ml-4">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}``