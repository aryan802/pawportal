import React, { useState } from "react";

const mockLostPets = [
  {
    id: 1,
    type: "Lost",
    name: "Tommy",
    species: "Dog",
    breed: "Labrador",
    color: "Golden",
    lastSeen: "Sector 21, Noida",
    date: "2025-08-25",
    contact: "Rohit: +91-9876543210",
    description: "Friendly, wearing a red collar, responds to his name.",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300",
  },
  {
    id: 2,
    type: "Found",
    species: "Cat",
    color: "White & Brown",
    lastSeen: "Powai Lake, Mumbai",
    date: "2025-08-28",
    contact: "Priya: +91-9123456780",
    description: "Small cat, green eyes, seems scared but healthy.",
    image: "https://images.unsplash.com/photo-1574443911390-8c8ec5a3b3d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8UGV0JTIwQ2F0fGVufDB8fDB8fHww",
  },
  {
    id: 3,
    type: "Lost",
    name: "Simba",
    species: "Dog",
    breed: "Beagle",
    color: "Tricolor",
    lastSeen: "MG Road, Bengaluru",
    date: "2025-08-20",
    contact: "Ankit: +91-9988776655",
    description: "Young, playful, microchipped, last seen with blue leash.",
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=300",
  },
];

const LostFound = () => {
  const [pets] = useState(mockLostPets);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-yellow-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full flex flex-col items-center relative">
        <h1 className="text-3xl font-extrabold text-green-700 mb-6 text-center">
          Lost &amp; Found Pets
        </h1>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className={`${
                pet.type === "Lost"
                  ? "bg-red-50 border-red-200"
                  : "bg-yellow-50 border-yellow-200"
              } border rounded-xl p-4 flex flex-col items-center shadow`}
            >
              <img
                src={pet.image}
                alt={pet.name || pet.species}
                className="w-24 h-24 object-cover rounded-full mb-3 border-2 border-green-300"
              />
              <h2 className={`text-lg font-bold mb-1 ${pet.type === "Lost" ? "text-red-600" : "text-yellow-600"}`}>
                {pet.type} <span className="capitalize">{pet.species}</span>
                {pet.name && (
                  <span className="text-blue-600">: {pet.name}</span>
                )}
              </h2>
              {pet.breed && (
                <div className="text-purple-600 mb-1 font-semibold">
                  Breed: {pet.breed}
                </div>
              )}
              <div className="mb-1">
                <span className="font-semibold text-gray-700">Color:</span>{" "}
                <span className="text-gray-800">{pet.color}</span>
              </div>
              <div className="mb-1">
                <span className="font-semibold text-gray-700">Last Seen:</span>{" "}
                <span className="text-gray-800">{pet.lastSeen}</span>
              </div>
              <div className="mb-1">
                <span className="font-semibold text-gray-700">Date:</span>{" "}
                <span className="text-gray-800">{pet.date}</span>
              </div>
              <p className="text-gray-700 text-center mb-2 font-medium">
                {pet.description}
              </p>
              <div className="text-sm mb-2">
                <span className="font-semibold text-gray-700">Contact:</span>{" "}
                <span className="text-blue-700">{pet.contact}</span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                  pet.type === "Lost"
                    ? "bg-red-200 text-red-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {pet.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LostFound;