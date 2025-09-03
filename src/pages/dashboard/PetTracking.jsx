import React, { useState } from "react";
const mockPetData = {
  name: "Bruno",
  lastVetVisit: "2024-12-15",
  reminders: [
    { id: 1, text: "Next vet visit due: 2025-09-15" },
    { id: 2, text: "Vaccination booster due: 2025-10-01" },
    { id: 3, text: "Deworming due: 2025-09-10" },
  ],
  careTasks: [
    "Daily walk & exercise",
    "Brush coat 2-3 times a week",
    "Clean ears weekly",
    "Trim nails monthly",
    "Check for ticks/fleas regularly",
    "Provide fresh water and balanced diet",
  ],
  healthStats: {
    weight: "28 kg",
    age: "3 years",
    breed: "Golden Retriever",
    insurance: "Active",
  },
  missedVetVisits: 1,
};
function daysSince(dateStr) {
  const last = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - last) / (1000 * 60 * 60 * 24));
  return diff;
}
const PetTracking = () => {
  const pet = mockPetData;
  const days = daysSince(pet.lastVetVisit);
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-blue-700 mb-2 text-center">
          Pet Tracking & Analytics
        </h1>
        <div className="mb-4 text-center">
          <span className="text-lg font-semibold text-gray-700">{pet.name}</span>
          <div className="text-gray-500 text-sm">
            {pet.breed} &bull; {pet.age} &bull; Weight: {pet.healthStats.weight}
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-4xl font-bold text-blue-600">{days} days</span>
            <span className="text-gray-700 text-sm mt-1">since last vet visit</span>
            {days > 180 && (
              <span className="text-red-500 text-xs mt-2 font-semibold">
                It's been over 6 months! Please schedule a vet visit.
              </span>
            )}
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-2xl font-bold text-green-600">{pet.missedVetVisits}</span>
            <span className="text-gray-700 text-sm mt-1">Missed Vet Visits</span>
          </div>
        </div>
        <div className="w-full mb-6">
          <h2 className="text-lg font-semibold text-pink-600 mb-2">Reminders</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {pet.reminders.map((reminder) => (
              <li key={reminder.id}>{reminder.text}</li>
            ))}
          </ul>
        </div>
        <div className="w-full mb-6">
          <h2 className="text-lg font-semibold text-yellow-600 mb-2">Common Care Tasks</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {pet.careTasks.map((task, idx) => (
              <li key={idx}>{task}</li>
            ))}
          </ul>
        </div>
        <div className="w-full mb-2">
          <h2 className="text-lg font-semibold text-indigo-600 mb-2">Other Suggestions</h2>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Book a health checkup if not done in last 6 months</li>
            <li>Review pet insurance coverage</li>
            <li>Schedule a grooming session</li>
            <li>Consult a trainer for behavioral enrichment</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default PetTracking;