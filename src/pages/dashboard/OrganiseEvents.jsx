import React, { useState } from "react";
const mockEvents = [
  {
    id: 1,
    title: "Adoption Drive",
    date: "2025-09-20",
    time: "10:00 AM - 4:00 PM",
    location: "Shelter Grounds",
    description: "A special event to help our lovely pets find forever homes. Volunteers needed for event management.",
    status: "Upcoming",
    organizer: "Shelter Admin",
  },
  {
    id: 2,
    title: "Free Vaccination Camp",
    date: "2025-08-15",
    time: "9:00 AM - 1:00 PM",
    location: "Community Hall",
    description: "Open for all pet owners. Bring your pets and get them vaccinated for free.",
    status: "Completed",
    organizer: "Shelter Admin",
  },
  {
    id: 3,
    title: "Pet Care Workshop",
    date: "2025-10-05",
    time: "2:00 PM - 5:00 PM",
    location: "Shelter Conference Room",
    description: "Learn about pet nutrition, grooming, and basic first aid from experts.",
    status: "Upcoming",
    organizer: "Shelter Admin",
  },
];
const statusColors = {
  Upcoming: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};
const OrganiseEvents = () => {
  const [events, setEvents] = useState(mockEvents);
  const handleEdit = (id) => {
    alert(`Edit event with ID: ${id}`);
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-yellow-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-purple-700 mb-6 text-center">
          Organise Events
        </h1>
        <div className="w-full flex justify-end mb-4">
          <button className="bg-pink-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-pink-600 transition shadow">
            + Add New Event
          </button>
        </div>
        <div className="w-full flex flex-col gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow"
            >
              <div className="flex-1">
                <h2 className="text-lg font-bold text-purple-700 mb-1">{event.title}</h2>
                <div className="mb-1">
                  <span className="font-semibold text-gray-700">Date:</span>{" "}
                  <span className="text-gray-800">{event.date}</span>
                  {" | "}
                  <span className="font-semibold text-gray-700">Time:</span>{" "}
                  <span className="text-gray-800">{event.time}</span>
                </div>
                <div className="mb-1">
                  <span className="font-semibold text-gray-700">Location:</span>{" "}
                  <span className="text-gray-800">{event.location}</span>
                </div>
                <div className="mb-1">
                  <span className="font-semibold text-gray-700">Organizer:</span>{" "}
                  <span className="text-gray-800">{event.organizer}</span>
                </div>
                <p className="text-gray-700 mb-2">{event.description}</p>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${statusColors[event.status] || "bg-gray-100 text-gray-700"}`}>
                  {event.status}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(event.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default OrganiseEvents;