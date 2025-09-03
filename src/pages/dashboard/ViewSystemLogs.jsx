import React, { useState } from "react";
const mockLogs = [
  {
    id: 1,
    timestamp: "2025-09-03 10:15:23",
    user: "Admin User",
    role: "System Admin",
    action: "Deleted user Rahul Verma",
    status: "Success",
  },
  {
    id: 2,
    timestamp: "2025-09-02 18:42:10",
    user: "Priya Singh",
    role: "Shelter Admin",
    action: "Added new pet: Bella (Dog)",
    status: "Success",
  },
  {
    id: 3,
    timestamp: "2025-09-02 14:05:55",
    user: "Sneha Kapoor",
    role: "Moderator",
    action: "Rejected post: 'Dog park meet-up this Sunday'",
    status: "Success",
  },
  {
    id: 4,
    timestamp: "2025-09-01 21:30:12",
    user: "Admin User",
    role: "System Admin",
    action: "Changed role of Amit Sharma to Owner",
    status: "Success",
  },
  {
    id: 5,
    timestamp: "2025-09-01 20:10:44",
    user: "Amit Sharma",
    role: "Owner",
    action: "Attempted unauthorized access to /system-roles",
    status: "Failed",
  },
];
const statusColors = {
  Success: "bg-green-100 text-green-700",
  Failed: "bg-red-100 text-red-700",
};
const ViewSystemLogs = () => {
  const [logs] = useState(mockLogs);
  const [search, setSearch] = useState("");
  const filteredLogs = logs.filter(
    (log) =>
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.role.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.status.toLowerCase().includes(search.toLowerCase()) ||
      log.timestamp.includes(search)
  );
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-gray-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-5xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-pink-700 mb-6 text-center">
          System Logs
        </h1>
        <div className="w-full flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search logs by user, action, status, or date..."
            className="border px-3 py-2 rounded w-full max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-white border rounded-xl">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">Timestamp</th>
                <th className="px-4 py-2 border-b text-left">User</th>
                <th className="px-4 py-2 border-b text-left">Role</th>
                <th className="px-4 py-2 border-b text-left">Action</th>
                <th className="px-4 py-2 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No logs found.
                  </td>
                </tr>
              )}
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-pink-50 transition">
                  <td className="px-4 py-2 border-b">{log.timestamp}</td>
                  <td className="px-4 py-2 border-b font-semibold">{log.user}</td>
                  <td className="px-4 py-2 border-b">{log.role}</td>
                  <td className="px-4 py-2 border-b">{log.action}</td>
                  <td className="px-4 py-2 border-b">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[log.status] || "bg-gray-100 text-gray-700"}`}>
                      {log.status}
                    </span>
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
export default ViewSystemLogs;