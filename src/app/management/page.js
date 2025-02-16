import Image from "next/image";

export default function Home() {
  // Temp john doe pre signin
  const user = {
    name: "John Doe",
    image: {Image},
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav Bar */}
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

      {/* Main Content */}
      <div className="pt-20 pb-8 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_400px] gap-8">
        {/* Left Side */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>

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

          <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-gray-800">High importance event</h2>
              <span className="text-red-600 text-sm font-medium bg-red-100 px-2 py-1 rounded-md">
                High priority
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-sm text-gray-600">Date</p>
              <p className="text-sm text-gray-600">Time</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Performance</h2>
              <p className="text-green-600 text-sm hover:underline cursor-pointer">
                Need more advice?
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Mostly</h2>
              <h3 className="text-gray-600 text-sm mt-1">Daily</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                      <th 
                        key={day} 
                        className="text-xs font-medium text-gray-500 py-3 px-2 border-b border-gray-200"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    [4, 5, 6, 7, 8, 9, 10],
                    [11, 12, 13, 14, 15, 16, 17],
                    [18, 19, 20, 21, 22, 23, 24],
                    [25, 26, 27, 28, 29, 30, 31]
                  ].map((week, i) => (
                    <tr key={i}>
                      {week.map((day) => (
                        <td 
                          key={day} 
                          className="text-center text-sm text-gray-600 p-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                        >
                          {day}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">Last Week</h3>
              <div className="space-y-1.5">
                <p className="text-gray-800 font-medium">Event</p>
                <p className="text-gray-600 ml-4">• Super Pondering.</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">Long term Goals</h3>
              <div className="space-y-1.5">
                <p className="text-gray-800 font-medium">Event</p>
                <p className="text-gray-600 ml-4">• Super Pondering.</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">Notes</h3>
              <div className="space-y-1.5">
                <p className="text-gray-800 font-medium">Event</p>
                <p className="text-gray-600 ml-4">• Super Pondering.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}