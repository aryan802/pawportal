import React, { useState } from "react";

const mockTrainers = [
  {
    id: 1,
    name: "Sandeep Kumar",
    experience: "7 years",
    rating: 4.9,
    fee: "₹700/session",
    location: "Delhi",
    specialties: ["Obedience", "Puppy Training", "Behavioral Issues"],
    contact: "sandeep.trainer@email.com, +91-9876543210",
    description: "Certified dog trainer, specializes in obedience and puppy training. Uses positive reinforcement methods.",
    image: "https://plus.unsplash.com/premium_photo-1689838026921-c09632fd77ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SW5kaWFuJTIwR3V5fGVufDB8fDB8fHww",
    available: true,
    nextAvailable: "Tomorrow, 10:00 AM",
  },
  {
    id: 2,
    name: "Neha Sharma",
    experience: "5 years",
    rating: 4.8,
    fee: "₹600/session",
    location: "Mumbai",
    specialties: ["Agility", "Trick Training", "Socialization"],
    contact: "neha.trainer@email.com, +91-9123456780",
    description: "Experienced with all breeds, offers group and private sessions. Focuses on agility and socialization.",
    image: "https://plus.unsplash.com/premium_photo-1664910500054-608d23c060f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8SW5kaWFuJTIwUHJvZmVzc2lvbmFsJTIwR2lybHxlbnwwfHwwfHx8MA%3D%3D",
    available: true,
    nextAvailable: "Today, 4:00 PM",
  },
  {
    id: 3,
    name: "Rahul Verma",
    experience: "4 years",
    rating: 4.7,
    fee: "₹500/session",
    location: "Bangalore",
    specialties: ["Guard Training", "Basic Commands"],
    contact: "rahul.trainer@email.com, +91-9988776655",
    description: "Specializes in guard training and basic commands. Patient and friendly with pets.",
    image: "https://images.unsplash.com/photo-1637589274892-9bc2d5200eab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SW5kaWFuJTIwR3V5fGVufDB8fDB8fHww",
    available: false,
    nextAvailable: "In 3 days",
  },
];

const Trainers = () => {
  const [trainers] = useState(mockTrainers);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Access Training Professionals
        </h1>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex flex-col items-center shadow"
            >
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-24 h-24 object-cover rounded-full mb-3 border"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-1">{trainer.name}</h2>
              <div className="text-gray-500 mb-1">Experience: {trainer.experience}</div>
              <div className="text-yellow-600 mb-1">Rating: {trainer.rating} ⭐</div>
              <div className="text-indigo-700 font-semibold mb-1">{trainer.fee}</div>
              <div className="text-gray-600 mb-1">Location: {trainer.location}</div>
              <div className="text-gray-600 mb-1">
                Specialties: {trainer.specialties.join(", ")}
              </div>
              <p className="text-gray-700 text-center mb-2">{trainer.description}</p>
              <div className="text-sm text-blue-700 mb-2">
                Contact: {trainer.contact}
              </div>
              <div className="text-sm text-green-700 mb-2">
                Next Available: {trainer.nextAvailable}
              </div>
              {trainer.available ? (
                <button className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-600 transition">
                  Book Session
                </button>
              ) : (
                <span className="text-red-500 font-semibold">Currently Unavailable</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trainers;