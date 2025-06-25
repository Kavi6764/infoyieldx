// components/Employee/ScheduleCard.tsx
import React from "react";
import { Calendar } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "Team Standup",
    time: "9:00 AM - 9:30 AM",
    type: "Meeting",
    color: "blue",
  },
  {
    id: 2,
    title: "Client Presentation",
    time: "11:00 AM - 12:00 PM",
    type: "Call",
    color: "green",
  },
  {
    id: 3,
    title: "Code Review",
    time: "2:00 PM - 3:00 PM",
    type: "Review",
    color: "purple",
  },
];

const ScheduleCard = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-800">Today's Schedule</h2>
        <p className="text-sm text-gray-500">Your upcoming meetings and events</p>
      </div>

      <div className="space-y-4">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <div
              className={`h-3 w-3 rounded-full bg-${event.color}-500`}
            ></div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{event.title}</h4>
              <p className="text-sm text-gray-600">{event.time}</p>
            </div>
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded border text-${event.color}-700 border-${event.color}-200`}
            >
              {event.type}
            </span>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition">
        <Calendar className="h-4 w-4 mr-2" />
        View Full Calendar
      </button>
    </div>
  );
};

export default ScheduleCard;
