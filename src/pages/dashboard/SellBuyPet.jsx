import React, { useState } from "react";
const mockPetsForSale = [
  {
    id: 1,
    name: "Bruno",
    breed: "Golden Retriever",
    age: "2 years",
    price: "₹15,000",
    location: "Delhi",
    description: "Healthy, vaccinated, playful, and friendly.",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300",
    contact: "owner1@email.com, +91-9876543210",
  },
  {
    id: 2,
    name: "Milo",
    breed: "Pug",
    age: "1 year",
    price: "₹8,000",
    location: "Mumbai",
    description: "Small, affectionate, and great for apartments.",
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=300",
    contact: "owner2@email.com, +91-9123456780",
  },
];
const SellBuyPet = () => {
  const [pets] = useState(mockPetsForSale);
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-pink-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-yellow-700 mb-6 text-center">
          Sell / Buy Pets
        </h1>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col items-center shadow"
            >
              <img
                src={pet.image}
                alt={pet.name}
                className="w-32 h-32 object-cover rounded-full mb-3 border"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-1">{pet.name}</h2>
              <div className="text-gray-500 mb-1">{pet.breed}</div>
              <div className="text-gray-400 mb-1">{pet.age}</div>
              <div className="text-green-700 font-semibold mb-1">{pet.price}</div>
              <div className="text-gray-600 mb-1">Location: {pet.location}</div>
              <p className="text-gray-700 text-center mb-2">{pet.description}</p>
              <div className="text-sm text-blue-700 mb-2">
                Contact: {pet.contact}
              </div>
              <button className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-600 transition">
                Express Interest
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SellBuyPet;