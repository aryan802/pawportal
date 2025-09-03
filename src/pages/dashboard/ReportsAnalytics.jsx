import React, { useState } from "react";
const mockReports = {
  totalPets: 42,
  adoptedPets: 28,
  availablePets: 12,
  underTreatment: 2,
  totalStaff: 8,
  eventsOrganized: 5,
  adoptionRate: 67,
  recentAdoptions: [
    { pet: "Misty", adopter: "Priya Singh", date: "2025-09-01" },
    { pet: "Bruno", adopter: "Amit Sharma", date: "2025-08-28" },
    { pet: "Simba", adopter: "Rahul Verma", date: "2025-08-25" },
  ],
  monthlyAdoptions: [
    { month: "June", count: 6 },
    { month: "July", count: 8 },
    { month: "August", count: 10 },
    { month: "September", count: 4 },
  ],
};
const ReportsAnalytics = () => {
  const [reports] = useState(mockReports);
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-yellow-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-pink-700 mb-6 text-center">
          Reports & Analytics
        </h1>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-green-700">{reports.totalPets}</span>
            <span className="text-gray-700 text-sm mt-1">Total Pets</span>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-700">{reports.adoptedPets}</span>
            <span className="text-gray-700 text-sm mt-1">Adopted Pets</span>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-yellow-700">{reports.availablePets}</span>
            <span className="text-gray-700 text-sm mt-1">Available Pets</span>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-purple-700">{reports.underTreatment}</span>
            <span className="text-gray-700 text-sm mt-1">Under Treatment</span>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-indigo-700">{reports.totalStaff}</span>
            <span className="text-gray-700 text-sm mt-1">Total Staff</span>
          </div>
          <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-pink-700">{reports.eventsOrganized}</span>
            <span className="text-gray-700 text-sm mt-1">Events Organized</span>
          </div>
        </div>
        <div className="w-full mb-8">
          <h2 className="text-lg font-semibold text-green-700 mb-2">Adoption Rate</h2>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${reports.adoptionRate}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-700">{reports.adoptionRate}% of pets have been adopted</div>
        </div>
        <div className="w-full mb-8">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Recent Adoptions</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {reports.recentAdoptions.map((item, idx) => (
              <li key={idx}>
                <span className="font-semibold text-green-700">{item.pet}</span> adopted by{" "}
                <span className="text-blue-700">{item.adopter}</span> on{" "}
                <span className="text-gray-600">{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full">
          <h2 className="text-lg font-semibold text-yellow-700 mb-2">Monthly Adoptions</h2>
          <div className="flex flex-col gap-2">
            {reports.monthlyAdoptions.map((m, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="w-20 text-gray-700">{m.month}</span>
                <div className="flex-1 bg-yellow-100 rounded h-3">
                  <div
                    className="bg-yellow-400 h-3 rounded"
                    style={{ width: `${m.count * 10}%` }}
                  ></div>
                </div>
                <span className="w-8 text-yellow-700 font-bold text-right">{m.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReportsAnalytics;