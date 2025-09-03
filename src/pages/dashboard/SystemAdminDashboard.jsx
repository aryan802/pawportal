import React from "react";
import { Link } from "react-router-dom";
const SystemAdminDashboard = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 py-10">
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full flex flex-col items-center relative">
      <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">System Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        <Link to="/system-users">
          <button className="w-full bg-blue-50 border border-blue-200 text-blue-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-blue-100 transition">
            Manage All Users
          </button>
        </Link>
        <Link to="/system-roles">
          <button className="w-full bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-green-100 transition">
            Manage Roles & Permissions
          </button>
        </Link>
        <Link to="/system-logs">
          <button className="w-full bg-pink-50 border border-pink-200 text-pink-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-pink-100 transition">
            View System Logs
          </button>
        </Link>
        <Link to="/system-analytics">
          <button className="w-full bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-indigo-100 transition">
            Analytics & Reports
          </button>
        </Link>
      </div>
    </div>
  </div>
);
export default SystemAdminDashboard;