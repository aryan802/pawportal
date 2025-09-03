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
  {
    id: 5,
    name: "Admin User",
    email: "admin@email.com",
    role: "System Admin",
    status: "Active",
    joined: "2023-01-01",
  },
];
const statusColors = {
  Active: "bg-green-100 text-green-700",
  Suspended: "bg-red-100 text-red-700",
};
const roleColors = {
  "Owner": "text-blue-700",
  "Shelter Admin": "text-green-700",
  "Moderator": "text-indigo-700",
  "System Admin": "text-pink-700",
};
const ManageAllUsers = () => {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
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
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-5xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Manage All Users
        </h1>
        <div className="w-full flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            className="border px-3 py-2 rounded w-full max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-white border rounded-xl">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">Name</th>
                <th className="px-4 py-2 border-b text-left">Email</th>
                <th className="px-4 py-2 border-b text-left">Role</th>
                <th className="px-4 py-2 border-b text-left">Joined</th>
                <th className="px-4 py-2 border-b text-left">Status</th>
                <th className="px-4 py-2 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50 transition">
                  <td className="px-4 py-2 border-b font-semibold">{user.name}</td>
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className={`px-4 py-2 border-b font-semibold ${roleColors[user.role] || "text-gray-700"}`}>{user.role}</td>
                  <td className="px-4 py-2 border-b">{user.joined}</td>
                  <td className="px-4 py-2 border-b">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[user.status] || "bg-gray-100 text-gray-700"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <div className="flex gap-2">
                      {user.status === "Active" ? (
                        <button
                          onClick={() => handleSuspend(user.id)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-yellow-600 transition"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivate(user.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-600 transition"
                        >
                          Activate
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ManageAllUsers;