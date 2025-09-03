import React, { useState } from "react";

const mockPets = [
  {
    id: 1,
    name: "Bruno",
    species: "Dog",
    breed: "Labrador",
    age: "2 years",
    gender: "Male",
    status: "Available",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300",
    description: "Friendly and playful, vaccinated, good with kids.",
  },
  {
    id: 2,
    name: "Misty",
    species: "Cat",
    breed: "Persian",
    age: "1 year",
    gender: "Female",
    status: "Adopted",
    image: "https://images.unsplash.com/photo-1576433456577-c6dcdb7b20a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8UGVyc2lhbiUyMENhdHN8ZW58MHx8MHx8fDA%3D",
    description: "Calm and affectionate, litter trained.",
  },
  {
    id: 3,
    name: "Simba",
    species: "Dog",
    breed: "Beagle",
    age: "3 years",
    gender: "Male",
    status: "Available",
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=300",
    description: "Energetic, loves walks, microchipped.",
  },
];

const statusColors = {
  Available: "bg-green-100 text-green-700",
  Adopted: "bg-blue-100 text-blue-700",
  "Under Treatment": "bg-yellow-100 text-yellow-700",
};

const ManagePets = () => {
  const [pets, setPets] = useState(mockPets);

  // Placeholder handlers for edit/delete (implement as needed)
  const handleEdit = (id) => {
    alert(`Edit pet with ID: ${id}`);
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      setPets(pets.filter((pet) => pet.id !== id));
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-yellow-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Manage Pets
        </h1>
        <div className="w-full flex justify-end mb-4">
          <button className="bg-pink-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-pink-600 transition shadow">
            + Add New Pet
          </button>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col items-center shadow"
            >
              <img
                src={pet.image}
                alt={pet.name}
                className="w-24 h-24 object-cover rounded-full mb-3 border"
              />
              <h2 className="text-lg font-bold text-green-700 mb-1">{pet.name}</h2>
              <div className="text-gray-600 mb-1">{pet.species} &bull; {pet.breed}</div>
              <div className="text-gray-600 mb-1">Age: {pet.age}</div>
              <div className="text-gray-600 mb-1">Gender: {pet.gender}</div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold mb-2 ${statusColors[pet.status] || "bg-gray-100 text-gray-700"}`}>
                {pet.status}
              </div>
              <p className="text-gray-700 text-center mb-2">{pet.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(pet.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pet.id)}
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

export default ManagePets;