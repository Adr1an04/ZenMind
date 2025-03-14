import Image from "next/image";

export default function Home() {
  // Temp user info
  const user = {
    name: "John Doe",
    image: "/path/to/profile.jpg", // Replace with an actual image URL
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0"></div>
            <div className="flex-1 max-w-2xl mx-8">
              <input
                type="text"
                placeholder="What's today's task?"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
              />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user.name}</span>
              <Image
                src={user.image}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Layout */}
      <div className="pt-20 pb-8 px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Left Main Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

          {/* Upcoming Work */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Upcoming Work</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <h3 className="font-medium text-gray-600 mb-2">Performance</h3>
                <ul className="space-y-1.5 ml-4">
                  <li className="text-gray-800 font-medium">Week 2</li>
                  <li className="text-gray-600 ml-4">• Pondering</li>
                  <li className="text-gray-600 ml-4">• Just pondering...</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-medium text-gray-600 mb-2">Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-sm text-gray-500">Time</p>
                </div>
              </div>
            </div>
          </div>

          {/* High Importance Event */}
          <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-gray-800">High Importance Event</h2>
              <span className="text-red-600 text-sm font-medium bg-red-100 px-2 py-1 rounded-md">
                High priority
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-sm text-gray-600">Date</p>
              <p className="text-sm text-gray-600">Time</p>
            </div>
          </div>

          {/* Performance Advice */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Performance</h2>
              <p className="text-green-600 text-sm hover:underline cursor-pointer">
                Need more advice?
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Calendar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">My Calendar</h2>
            <iframe
              src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_URL&ctz=YOUR_TIMEZONE"
              style={{ border: 0, width: "100%", height: "600px" }}
              frameBorder="0"
              scrolling="no"
              title="Google Calendar"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
