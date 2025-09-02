import React, { useState } from "react";

const mockVets = [
  {
    id: 1,
    name: "Dr. Anjali Mehra",
    specialization: "Small Animals, Vaccination",
    experience: "8 years",
    rating: 4.9,
    fee: "₹600/consultation",
    location: "Delhi",
    languages: ["Hindi", "English"],
    contact: "anjali.vet@email.com, +91-9876543210",
    description: "Expert in preventive care, vaccinations, and nutrition for dogs and cats.",
    image: "https://plus.unsplash.com/premium_photo-1682089874677-3eee554feb19?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8SW5kaWFuJTIwRmVtYWxlJTIwRG9jdG9yfGVufDB8fDB8fHww",
    available: true,
    nextAvailable: "Today, 5:00 PM",
  },
  {
    id: 2,
    name: "Dr. Rakesh Kumar",
    specialization: "Surgery, Emergency Care",
    experience: "12 years",
    rating: 4.8,
    fee: "₹800/consultation",
    location: "Mumbai",
    languages: ["Hindi", "Marathi", "English"],
    contact: "rakesh.vet@email.com, +91-9123456780",
    description: "Specialist in pet surgeries and emergency treatments. Available for online and in-clinic consults.",
    image: "https://images.unsplash.com/photo-1614105687119-93b4f75e8ca9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEluZGlhbiUyME1hbGUlMjBEb2N0b3J8ZW58MHx8MHx8fDA%3D",
    available: true,
    nextAvailable: "Tomorrow, 11:00 AM",
  },
  {
    id: 3,
    name: "Dr. Priya Sinha",
    specialization: "Exotic Pets, Birds",
    experience: "6 years",
    rating: 4.7,
    fee: "₹700/consultation",
    location: "Bangalore",
    languages: ["Hindi", "Kannada", "English"],
    contact: "priya.vet@email.com, +91-9988776655",
    description: "Experienced with rabbits, birds, and other exotic pets. Patient and friendly.",
    image: "https://plus.unsplash.com/premium_photo-1661665815817-1f8920d839f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEluZGlhbiUyMEZlbWFsZSUyMERvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
    available: false,
    nextAvailable: "In 2 days",
  },
];

const VetBooking = () => {
  const [vets] = useState(mockVets);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-purple-700 mb-6 text-center">
          Online Vet Bookings
        </h1>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          {vets.map((vet) => (
            <div
              key={vet.id}
              className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex flex-col items-center shadow"
            >
              <img
                src={vet.image}
                alt={vet.name}
                className="w-24 h-24 object-cover rounded-full mb-3 border"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-1">{vet.name}</h2>
              <div className="text-gray-500 mb-1">{vet.specialization}</div>
              <div className="text-gray-500 mb-1">Experience: {vet.experience}</div>
              <div className="text-yellow-600 mb-1">Rating: {vet.rating} ⭐</div>
              <div className="text-purple-700 font-semibold mb-1">{vet.fee}</div>
              <div className="text-gray-600 mb-1">Location: {vet.location}</div>
              <div className="text-gray-600 mb-1">
                Languages: {vet.languages.join(", ")}
              </div>
              <p className="text-gray-700 text-center mb-2">{vet.description}</p>
              <div className="text-sm text-blue-700 mb-2">
                Contact: {vet.contact}
              </div>
              <div className="text-sm text-green-700 mb-2">
                Next Available: {vet.nextAvailable}
              </div>
              {vet.available ? (
                <button className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-600 transition">
                  Book Consultation
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

export default VetBooking;