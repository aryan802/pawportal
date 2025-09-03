import React, { useState } from "react";

const mockUsers = [
  {
    id: 1,
    name: "Amit Sharma",
    email: "amit.sharma@email.com",
    role: "Owner",
    status: "Active",
    joined: "2024-03-10",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya.singh@email.com",
    role: "Shelter Admin",
    status: "Active",
    joined: "2023-11-22",
  },
  {
    id: 3,
    name: "Rahul Verma",
    email: "rahul.verma@email.com",
    role: "Owner",
    status: "Suspended",
    joined: "2025-01-05",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    email: "sneha.kapoor@email.com",
    role: "Moderator",
    status: "Active",
    joined: "2024-07-18",
  },
];

const statusColors = {
  Active: "bg-green-100 text-green-700",
  Suspended: "bg-red-100 text-red-700",
};

const ManageUsers = () => {
  const [users, setUsers] = useState(mockUsers);

  const handleSuspend = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: "Suspended" } : user
      )
    );
  };

  const handleActivate = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: "Active" } : user
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Manage Users
        </h1>
        <div className="w-full flex flex-col gap-6">
          {users.length === 0 && (
            <div className="text-gray-500 text-center">No users found.</div>
          )}
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow"
            >
              <div className="flex-1">
                <h2 className="text-lg font-bold text-blue-700 mb-1">{user.name}</h2>
                <div className="mb-1">
                  <span className="font-semibold text-gray-700">Email:</span>{" "}
                  <span className="text-gray-800">{user.email}</span>
                </div>
                <div className="mb-1">
                  <span className="font-semibold text-gray-700">Role:</span>{" "}
                  <span className="text-indigo-700">{user.role}</span>
                </div>
                <div className="mb-1">
                  <span className="font-semibold text-gray-700">Joined:</span>{" "}
                  <span className="text-gray-800">{user.joined}</span>
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${statusColors[user.status] || "bg-gray-100 text-gray-700"}`}>
                  {user.status}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {user.status === "Active" ? (
                  <button
                    onClick={() => handleSuspend(user.id)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-full font-semibold hover:bg-yellow-600 transition"
                  >
                    Suspend
                  </button>
                ) : (
                  <button
                    onClick={() => handleActivate(user.id)}
                    className="bg-green-500 text-white px-4 py-1 rounded-full font-semibold hover:bg-green-600 transition"
                  >
                    Activate
                  </button>
                )}
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-full font-semibold hover:bg-red-600 transition"
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

export default ManageUsers;