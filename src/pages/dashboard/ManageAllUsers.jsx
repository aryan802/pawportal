import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { USER_ROLES } from "../../utils/constants";

const statusColors = {
  Active: "bg-green-100 text-green-700",
  Suspended: "bg-red-100 text-red-700",
};

const roleColors = {
  [USER_ROLES.GUEST]: "text-gray-700",
  [USER_ROLES.PET_OWNER]: "text-blue-700",
  [USER_ROLES.SHELTER_ADMIN]: "text-green-700",
  [USER_ROLES.MODERATOR]: "text-indigo-700",
  [USER_ROLES.SYSTEM_ADMIN]: "text-pink-700",
};

const ManageAllUsers = () => {
  const { getUsers, updateRole } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Load users on component mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const result = await getUsers();
        if (result.success) {
          // Add status field to users (all are Active by default)
          const usersWithStatus = result.users.map(user => ({
            ...user,
            status: "Active"
          }));
          setUsers(usersWithStatus);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [getUsers]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const result = await updateRole(userId, newRole);
      if (result.success) {
        // Update the user in the local state
        setUsers(users.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        ));
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to update user role");
    }
  };

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-5xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Manage All Users
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full">
            {error}
          </div>
        )}
        
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
                  <td className="px-4 py-2 border-b">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className={`font-semibold border-0 bg-transparent ${roleColors[user.role] || "text-gray-700"} focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 py-1`}
                      disabled={user.role === USER_ROLES.SYSTEM_ADMIN}
                    >
                      <option value={USER_ROLES.GUEST}>Guest</option>
                      <option value={USER_ROLES.PET_OWNER}>Pet Owner</option>
                      <option value={USER_ROLES.SHELTER_ADMIN}>Shelter Admin</option>
                      <option value={USER_ROLES.MODERATOR}>Moderator</option>
                      <option value={USER_ROLES.SYSTEM_ADMIN}>System Admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b">{formatDate(user.createdAt)}</td>
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
                        disabled={user.role === USER_ROLES.SYSTEM_ADMIN}
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