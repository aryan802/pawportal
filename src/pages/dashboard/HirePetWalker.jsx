import React, { useState } from "react";

const mockWalkers = [
  {
    id: 1,
    name: "Amit Sharma",
    experience: "3 years",
    rating: 4.8,
    price: "₹300/walk",
    location: "Delhi",
    petsHandled: ["Dogs", "Cats"],
    contact: "amit.walker@email.com, +91-9876543210",
    description: "Certified dog walker, experienced with all breeds. Friendly and punctual.",
    // Indian male photo
    image: "https://images.unsplash.com/photo-1649433658557-54cf58577c68?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SW5kaWFuJTIwR3V5fGVufDB8fDB8fHww",
    available: true,
  },
  {
    id: 2,
    name: "Mohit Singh",
    experience: "5 years",
    rating: 4.9,
    price: "₹400/walk",
    location: "Mumbai",
    petsHandled: ["Dogs"],
    contact: "mohit.walker@email.com, +91-9123456780",
    description: "Animal lover, specializes in large breeds. Flexible timings.",
    image: "https://images.unsplash.com/photo-1701365676249-9d7ab5022dec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fEluZGlhbiUyMEd1eXxlbnwwfHwwfHx8MA%3D%3D",
    available: true,
  },
  {
    id: 3,
    name: "Rahul Verma",
    experience: "2 years",
    rating: 4.6,
    price: "₹250/walk",
    location: "Bangalore",
    petsHandled: ["Dogs", "Rabbits"],
    contact: "rahul.walker@email.com, +91-9988776655",
    description: "Energetic walker, can handle multiple pets. References available.",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    available: false,
  },
];

const HirePetWalker = () => {
  const [walkers] = useState(mockWalkers);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Hire a Pet Walker
        </h1>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          {walkers.map((walker) => (
            <div
              key={walker.id}
              className="bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col items-center shadow"
            >
              <img
                src={walker.image}
                alt={walker.name}
                className="w-24 h-24 object-cover rounded-full mb-3 border"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-1">{walker.name}</h2>
              <div className="text-gray-500 mb-1">Experience: {walker.experience}</div>
              <div className="text-yellow-600 mb-1">Rating: {walker.rating} ⭐</div>
              <div className="text-green-700 font-semibold mb-1">{walker.price}</div>
              <div className="text-gray-600 mb-1">Location: {walker.location}</div>
              <div className="text-gray-600 mb-1">
                Pets Handled: {walker.petsHandled.join(", ")}
              </div>
              <p className="text-gray-700 text-center mb-2">{walker.description}</p>
              <div className="text-sm text-blue-700 mb-2">
                Contact: {walker.contact}
              </div>
              {walker.available ? (
                <button className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-600 transition">
                  Book Now
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

export default HirePetWalker;