import React, { useState } from "react";

const mockRequests = [
  {
    id: 1,
    petName: "Bruno",
    petType: "Dog",
    breed: "Labrador",
    adopterName: "Amit Sharma",
    adopterEmail: "amit.sharma@email.com",
    adopterPhone: "+91-9876543210",
    status: "Pending",
    date: "2025-09-01",
    message: "I have a big yard and experience with Labradors. Looking forward to adopting Bruno!",
  },
  {
    id: 2,
    petName: "Misty",
    petType: "Cat",
    breed: "Persian",
    adopterName: "Priya Singh",
    adopterEmail: "priya.singh@email.com",
    adopterPhone: "+91-9123456780",
    status: "Approved",
    date: "2025-08-30",
    message: "My family loves cats and Misty would be a great addition.",
  },
  {
    id: 3,
    petName: "Simba",
    petType: "Dog",
    breed: "Beagle",
    adopterName: "Rahul Verma",
    adopterEmail: "rahul.verma@email.com",
    adopterPhone: "+91-9988776655",
    status: "Rejected",
    date: "2025-08-28",
    message: "I am a first-time pet owner but very enthusiastic.",
  },
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const AdoptionRequests = () => {
  const [requests, setRequests] = useState(mockRequests);

  // Placeholder handlers for approve/reject (implement as needed)
  const handleApprove = (id) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "Approved" } : req
      )
    );
  };
  const handleReject = (id) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "Rejected" } : req
      )
    );
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-yellow-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Adoption Requests
        </h1>
        <div className="w-full flex flex-col gap-6">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow"
            >
              <div className="flex-1">
                <h2 className="text-lg font-bold text-green-700 mb-1">
                  {req.petName} <span className="text-gray-500">({req.petType}, {req.breed})</span>
                </h2>
                <div className="mb-1">
                  <span className="font-semibold text-gray-700">Adopter:</span>{" "}
                  <span className="text-blue-700">{req.adopterName}</span>
                </div>
                <div className="mb-1">
                  <span className="font-semibold text-gray-700">Email:</span>{" "}
                  <span className="text-gray-800">{req.adopterEmail}</span>
                </div>
                <div className="mb-1">
                  <span className="font-semibold text-gray-700">Phone:</span>{" "}
                  <span className="text-gray-800">{req.adopterPhone}</span>
                </div>
                <div className="mb-1">
                  <span className="font-semibold text-gray-700">Date:</span>{" "}
                  <span className="text-gray-800">{req.date}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Message:</span>{" "}
                  <span className="text-gray-700">{req.message}</span>
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${statusColors[req.status] || "bg-gray-100 text-gray-700"}`}>
                  {req.status}
                </div>
              </div>
              {req.status === "Pending" && (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleApprove(req.id)}
                    className="bg-green-500 text-white px-4 py-1 rounded-full font-semibold hover:bg-green-600 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-full font-semibold hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdoptionRequests;