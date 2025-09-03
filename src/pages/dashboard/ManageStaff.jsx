import React, { useState } from "react";

const mockStaff = [
  {
    id: 1,
    name: "Amit Sharma",
    role: "Veterinarian",
    email: "amit.vet@email.com",
    phone: "+91-9876543210",
    status: "Active",
    joined: "2023-04-15",
    image: "https://images.unsplash.com/photo-1659353888352-5dbb14b80eca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFsZSUyMFZldCUyMGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    name: "Priya Singh",
    role: "Caretaker",
    email: "priya.care@email.com",
    phone: "+91-9123456780",
    status: "Active",
    joined: "2024-01-10",
    image: "https://images.unsplash.com/photo-1736289173074-df6009da27c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fEdpcmwlMjBWZXQlMjBkb2N0b3J8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Receptionist",
    email: "rahul.rec@email.com",
    phone: "+91-9988776655",
    status: "Inactive",
    joined: "2022-09-05",
    image: "https://images.unsplash.com/photo-1645066928295-2506defde470?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWFsZSUyMFZldCUyMGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
  },
];

const statusColors = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-700",
};

const ManageStaff = () => {
  const [staff, setStaff] = useState(mockStaff);

  // Placeholder handlers for edit/delete (implement as needed)
  const handleEdit = (id) => {
    alert(`Edit staff with ID: ${id}`);
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this staff member?")) {
      setStaff(staff.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-green-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-yellow-700 mb-6 text-center">
          Manage Staff
        </h1>
        <div className="w-full flex justify-end mb-4">
          <button className="bg-pink-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-pink-600 transition shadow">
            + Add New Staff
          </button>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((member) => (
            <div
              key={member.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col items-center shadow"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 object-cover rounded-full mb-3 border"
              />
              <h2 className="text-lg font-bold text-yellow-700 mb-1">{member.name}</h2>
              <div className="text-gray-600 mb-1">{member.role}</div>
              <div className="text-gray-600 mb-1">Email: {member.email}</div>
              <div className="text-gray-600 mb-1">Phone: {member.phone}</div>
              <div className="text-gray-600 mb-1">Joined: {member.joined}</div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold mb-2 ${statusColors[member.status] || "bg-gray-100 text-gray-700"}`}>
                {member.status}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(member.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageStaff;