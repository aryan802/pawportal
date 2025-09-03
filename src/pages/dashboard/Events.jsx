import React, { useState } from "react";
const mockEvents = [
  {
    id: 1,
    title: "PawFest 2025 - Pet Carnival",
    date: "2025-09-15",
    time: "10:00 AM - 5:00 PM",
    location: "Central Park, Delhi",
    description:
      "Join us for a fun-filled day with pet games, adoption drives, training demos, and food stalls. Free entry for all pet lovers!",
    organizer: "Delhi Pet Society",
    image: "https://plus.unsplash.com/premium_photo-1714618937899-86c698f792a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGV0JTIwY2Fybml2YWx8ZW58MHx8MHx8fDA%3D",
    tags: ["Carnival", "Adoption", "Games"],
    registration: "https://pawfest2025.com/register",
  },
  {
    id: 2,
    title: "Free Vaccination Camp",
    date: "2025-09-20",
    time: "9:00 AM - 1:00 PM",
    location: "PetCare Clinic, Mumbai",
    description:
      "Get your pets vaccinated for free! Open for dogs and cats. Bring your pet's previous medical records if available.",
    organizer: "PetCare Clinic",
    image: "https://images.unsplash.com/photo-1541887796712-054f4b0f8e5d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RnJlZSUyMHZhY2NpbmF0aW9uJTIwY2FtcCUyMGRvZ3N8ZW58MHx8MHx8fDA%3D",
    tags: ["Healthcare", "Vaccination", "Free"],
    registration: "",
  },
  {
    id: 3,
    title: "Dog Walkathon",
    date: "2025-10-05",
    time: "7:00 AM - 10:00 AM",
    location: "Cubbon Park, Bengaluru",
    description:
      "Participate in a healthy walk with your furry friends. Prizes for best costumes and most energetic dog!",
    organizer: "Bangalore Canine Club",
    image: "https://images.unsplash.com/photo-1651464435879-bf0be3203949?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RG9nJTIwd2Fsa2F0aG9ufGVufDB8fDB8fHww",
    tags: ["Walkathon", "Fitness", "Fun"],
    registration: "https://dogwalkathon.in/register",
  },
  {
    id: 4,
    title: "Pet Training Workshop",
    date: "2025-09-25",
    time: "4:00 PM - 6:00 PM",
    location: "Green Meadows, Hyderabad",
    description:
      "Learn basic obedience and fun tricks from certified trainers. Open for all breeds and ages.",
    organizer: "Hyderabad Pet Trainers",
    image: "https://plus.unsplash.com/premium_photo-1679521026472-5f9348b7803a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGV0JTIwdHJhaW5pbmclMjB3b3Jrc2hvcHxlbnwwfHwwfHx8MA%3D%3D",
    tags: ["Training", "Workshop"],
    registration: "",
  },
];
const tagColors = {
  Carnival: "bg-pink-100 text-pink-700",
  Adoption: "bg-green-100 text-green-700",
  Games: "bg-yellow-100 text-yellow-700",
  Healthcare: "bg-blue-100 text-blue-700",
  Vaccination: "bg-purple-100 text-purple-700",
  Free: "bg-green-100 text-green-700",
  Walkathon: "bg-orange-100 text-orange-700",
  Fitness: "bg-blue-100 text-blue-700",
  Fun: "bg-yellow-100 text-yellow-700",
  Training: "bg-indigo-100 text-indigo-700",
  Workshop: "bg-purple-100 text-purple-700",
};
const Events = () => {
  const [events] = useState(mockEvents);
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-yellow-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full flex flex-col items-center relative">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-2 text-center">
          Upcoming Pet Events
        </h1>
        <p className="text-gray-500 text-center mb-8 max-w-2xl">
          Discover pet carnivals, health camps, workshops, and more happening near you. Join the community and make memories with your pets!
        </p>
        <div className="w-full flex flex-col gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow hover:shadow-lg transition"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-32 h-32 object-cover rounded-2xl border mb-3 sm:mb-0"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-purple-700 mb-1">{event.title}</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  {event.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${tagColors[tag] || "bg-gray-100 text-gray-700"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-gray-600 mb-1">
                  <span className="font-semibold text-gray-700">Date:</span> {event.date}
                  {" | "}
                  <span className="font-semibold text-gray-700">Time:</span> {event.time}
                </div>
                <div className="text-gray-600 mb-1">
                  <span className="font-semibold text-gray-700">Location:</span> {event.location}
                </div>
                <div className="text-gray-600 mb-1">
                  <span className="font-semibold text-gray-700">Organizer:</span> {event.organizer}
                </div>
                <p className="text-gray-700 mb-2">{event.description}</p>
                {event.registration ? (
                  <a
                    href={event.registration}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-600 transition"
                  >
                    Register
                  </a>
                ) : (
                  <span className="text-green-700 font-semibold">No Registration Needed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Events;