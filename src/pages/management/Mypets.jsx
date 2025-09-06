import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { userPetService } from "../../services/dataService";

const MyPets = () => {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [showAddPet, setShowAddPet] = useState(false);
  const [newPet, setNewPet] = useState({
    name: "",
    breed: "",
    age: "",
    description: ""
  });

  // Load user's pets on component mount
  useEffect(() => {
    if (user?.id) {
      const userPets = userPetService.getUserPets(user.id);
      setPets(userPets);
    }
  }, [user?.id]);

  const handleAddPet = (e) => {
    e.preventDefault();
    if (user?.id) {
      const pet = userPetService.addUserPet(user.id, {
        ...newPet,
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGV0JTIwcGxhY2Vob2xkZXJ8ZW58MHx8fDB8fHww"
      });
      setPets([...pets, pet]);
      setNewPet({ name: "", breed: "", age: "", description: "" });
      setShowAddPet(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Pets</h1>
              <p className="text-gray-600">Manage your pet profiles and information</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </Link>
              <button
                onClick={() => setShowAddPet(true)}
                className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
              >
                Add New Pet
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {pets.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pets yet</h3>
            <p className="text-gray-500 mb-4">Add your first pet to get started</p>
            <button
              onClick={() => setShowAddPet(true)}
              className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
            >
              Add Your First Pet
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div key={pet.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{pet.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pet.healthStatus === 'Healthy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {pet.healthStatus}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{pet.breed} • {pet.age}</p>
                  <p className="text-gray-500 text-sm mb-4">{pet.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Checkup:</span>
                      <span className="text-gray-900">{pet.lastCheckup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Next Vaccination:</span>
                      <span className="text-gray-900">{pet.nextVaccination}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Link
                      to={`/pet-detail/${pet.id}`}
                      className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded text-center text-sm hover:bg-blue-100 transition"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/pet-documents/${pet.id}`}
                      className="flex-1 bg-green-50 text-green-700 px-3 py-2 rounded text-center text-sm hover:bg-green-100 transition"
                    >
                      Documents
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Pet Modal */}
      {showAddPet && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-25" onClick={() => setShowAddPet(false)}></div>
          
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Pet</h2>
                
                <form onSubmit={handleAddPet} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name</label>
                    <input
                      type="text"
                      required
                      className="w-full border rounded px-3 py-2"
                      value={newPet.name}
                      onChange={(e) => setNewPet({...newPet, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                    <input
                      type="text"
                      required
                      className="w-full border rounded px-3 py-2"
                      value={newPet.breed}
                      onChange={(e) => setNewPet({...newPet, breed: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="text"
                      required
                      className="w-full border rounded px-3 py-2"
                      value={newPet.age}
                      onChange={(e) => setNewPet({...newPet, age: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      className="w-full border rounded px-3 py-2"
                      value={newPet.description}
                      onChange={(e) => setNewPet({...newPet, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddPet(false)}
                      className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
                    >
                      Add Pet
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPets;
