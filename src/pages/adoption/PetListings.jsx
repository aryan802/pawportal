import React, { useState, useEffect } from "react";
import { useRolePromotion } from "../../hooks/useRolePromotion";
import { petService } from "../../services/dataService";

const PetListings = () => {
  const [pets, setPets] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [profilePet, setProfilePet] = useState(null);
  const [adoptPet, setAdoptPet] = useState(null);
  const [adoptForm, setAdoptForm] = useState({ name: '', email: '', message: '' });
  const [adoptSuccess, setAdoptSuccess] = useState(false);
  const [search, setSearch] = useState("");
  const [breedFilter, setBreedFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const { promoteOnPetAdoption } = useRolePromotion();

  // Load pets data on component mount
  useEffect(() => {
    const petsData = petService.getPets();
    setPets(petsData);
  }, []);

const PetProfileModal = ({ pet, onClose }) => {
  if (!pet) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <img
          src={pet.image}
          alt={pet.name}
          className="w-48 h-48 object-cover rounded-xl mx-auto mb-4 border"
        />
        <h2 className="text-2xl font-bold text-center mb-2">{pet.name}</h2>
        <div className="text-center mb-2">
          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mr-2">
            {pet.breed}
          </span>
          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mr-2">
            {pet.age}
          </span>
        </div>
        <p className="text-gray-700 text-center mb-4">{pet.description}</p>
        <div className="mb-2">
          <span className="font-semibold">Diseases: </span>
          <span>{pet.diseases}</span>
        </div>
        <div className="mb-2">
          <span className="font-semibold">Allergies: </span>
          <span>{pet.allergies}</span>
        </div>
        <div className="mb-2">
          <span className="font-semibold">Owner: </span>
          <span>{pet.owner}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Contact: </span>
          <span>{pet.contact}</span>
        </div>
        <button
          className="w-full bg-pink-500 text-white py-2 rounded-full font-semibold hover:bg-pink-600 transition"
          onClick={() => alert("Adoption process coming soon!")}
        >
          Adopt Me
        </button>
      </div>
    </div>
  );
};
  const uniqueBreeds = Array.from(new Set(pets.map(p => p.breed)));
  const filteredPets = pets.filter(pet => {
    const matchesSearch =
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.breed.toLowerCase().includes(search.toLowerCase());
    const matchesBreed = breedFilter ? pet.breed === breedFilter : true;
    let matchesAge = true;
    if (ageFilter === "young") matchesAge = pet.age.includes("1") || pet.age.includes("2");
    if (ageFilter === "adult") matchesAge = pet.age.includes("3") || pet.age.includes("4");
    if (ageFilter === "senior") matchesAge = pet.age.includes("5") || pet.age.includes("6");
    return matchesSearch && matchesBreed && matchesAge;
  });
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">Adoptable Pets</h2>
      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <input
          type="text"
          placeholder="Search by name or breed..."
          className="border rounded px-3 py-2 w-64"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={breedFilter}
          onChange={e => setBreedFilter(e.target.value)}
        >
          <option value="">All Breeds</option>
          {uniqueBreeds.map(breed => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>
        <select
          className="border rounded px-3 py-2"
          value={ageFilter}
          onChange={e => setAgeFilter(e.target.value)}
        >
          <option value="">All Ages</option>
          <option value="young">Young (1-2 yrs)</option>
          <option value="adult">Adult (3-4 yrs)</option>
          <option value="senior">Senior (5+ yrs)</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {filteredPets.length === 0 && (
          <div className="col-span-full text-center text-gray-400 text-lg">No pets found matching your criteria.</div>
        )}
        {filteredPets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:border-pink-200 border border-transparent"
            style={{ cursor: 'pointer' }}
          >
            <img
              src={pet.image}
              alt={pet.name}
              className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-pink-100 transition duration-200 hover:border-pink-400"
              onClick={() => setModalImage(pet.image)}
              style={{ cursor: 'zoom-in' }}
              title="Click to view full image"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-1">{pet.name}</h3>
            <p className="text-gray-500 mb-1">{pet.breed}</p>
            <p className="text-gray-400 mb-2">{pet.age}</p>
            <p className="text-center text-gray-600 mb-4">{pet.description}</p>
            <div className="flex gap-2 w-full justify-center mt-2">
              <button
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-semibold transition duration-200 hover:bg-gray-200 hover:scale-105 hover:shadow"
                onClick={() => setProfilePet(pet)}
              >
                View Profile
              </button>
              <button
                className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold transition duration-200 hover:bg-pink-600 hover:scale-105 hover:shadow-lg"
                onClick={() => setAdoptPet(pet)}
              >
                Adopt Me
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal for full image view */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => setModalImage(null)}
        >
          <div className="relative">
            <img
              src={modalImage}
              alt="Full Pet"
              className="max-h-[80vh] max-w-[90vw] rounded-2xl shadow-2xl border-4 border-white"
            />
            <button
              className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-2 text-gray-700 hover:bg-pink-100 transition"
              onClick={e => { e.stopPropagation(); setModalImage(null); }}
              title="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {/* Modal for pet profile */}
      {profilePet && (
        <PetProfileModal pet={profilePet} onClose={() => setProfilePet(null)} />
      )}
      {/* Modal for adoption form */}
      {adoptPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={() => { setAdoptPet(null); setAdoptForm({ name: '', email: '', message: '' }); setAdoptSuccess(false); }}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-gray-400 hover:text-pink-500" onClick={() => { setAdoptPet(null); setAdoptForm({ name: '', email: '', message: '' }); setAdoptSuccess(false); }} title="Close">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-2 text-pink-600">Adopt {adoptPet.name}</h2>
            <p className="mb-4 text-gray-500">Express your interest in adopting this {adoptPet.breed}!</p>
            {adoptSuccess ? (
              <div className="text-green-600 font-semibold text-center py-6">Thank you! Your request has been submitted.</div>
            ) : (
              <form onSubmit={async (e) => { 
                e.preventDefault(); 
                setAdoptSuccess(true);
                // Promote user to Pet Owner if they're a Guest
                await promoteOnPetAdoption();
              }} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="border rounded px-3 py-2"
                  value={adoptForm.name}
                  onChange={e => setAdoptForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="border rounded px-3 py-2"
                  value={adoptForm.email}
                  onChange={e => setAdoptForm(f => ({ ...f, email: e.target.value }))}
                  required
                />
                <textarea
                  placeholder="Why do you want to adopt? (optional)"
                  className="border rounded px-3 py-2"
                  value={adoptForm.message}
                  onChange={e => setAdoptForm(f => ({ ...f, message: e.target.value }))}
                  rows={3}
                />
                <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-600 transition">Submit Request</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default PetListings;