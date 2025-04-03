'use client';
import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO } from 'date-fns';

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    description: ''
  });
  const [selectedEvents, setSelectedEvents] = useState([]);

  // Get all days in the current month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const existingEvents = getEventsForDate(date);
    setShowEventForm(true);
    setNewEvent({
      title: '',
      date: format(date, 'yyyy-MM-dd'),
      time: '',
      description: ''
    });
    setSelectedEvents(existingEvents);
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    const event = {
      id: Date.now(),
      ...newEvent,
      date: selectedDate.toISOString()
    };
    setEvents([...events, event]);
    setShowEventForm(false);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      description: ''
    });
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Calendar</h2>
        <div className="flex items-center space-x-4 px-4">
          <button
            onClick={handleTodayClick}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md text-black"
          >
            Today
          </button>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-full hover:bg-gray-600"
            >
              ←
            </button>
            <span className="text-lg font-semibold text-green-600">
              {format(currentDate, 'MMMM yyyy')}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-full hover:bg-gray-600"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold text-black">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((day, dayIdx) => {
          const dayEvents = getEventsForDate(day);
          return (
            <div
              key={day.toString()}
              onClick={() => handleDateClick(day)}
              className={`min-h-[100px] p-2 border rounded-lg cursor-pointer hover:bg-gray-50 text-black ${
                isToday(day) ? 'bg-green-50 border-green-200' : 'border-gray-200 text-black'
              } ${!isSameMonth(day, currentDate) ? 'text-black' : ''}`}
            >
              <span className="text-sm font-medium">{format(day, 'd')}</span>
              {dayEvents.length > 0 && (
                <div className="mt-1">
                  {dayEvents.map(event => (
                    <div
                      key={event.id}
                      className="text-xs p-1 mb-1 bg-green-100 rounded truncate text-black"
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-black">
              {format(selectedDate, 'MMMM d, yyyy')}
            </h3>
            
            {/* Existing Events */}
            {selectedEvents.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-2 text-black">Today's Events</h4>
                <div className="space-y-2">
                  {selectedEvents.map(event => (
                    <div key={event.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-black">
                      <div>
                        <p className="font-medium text-black">{event.title}</p>
                        <p className="text-sm text-black">{event.time}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Event Form */}
            <form onSubmit={handleEventSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full p-2 border rounded text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="w-full p-2 border rounded text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black mb-1">
                  Description
                </label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full p-2 border rounded text-black"
                  rows="3"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEventForm(false)}
                  className="px-4 py-2 text-black hover:bg-gray-100 rounded"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 