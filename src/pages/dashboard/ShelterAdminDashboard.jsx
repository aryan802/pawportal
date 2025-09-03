import React from "react";
import { Link } from "react-router-dom";

const ShelterAdminDashboard = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-green-50 py-10">
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full flex flex-col items-center relative">
      <h1 className="text-3xl font-bold text-yellow-700 mb-6 text-center">Shelter Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        <Link to="/manage-pets">
          <button className="w-full bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-green-100 transition">
            Manage Pets
          </button>
        </Link>
        <Link to="/adoption-requests">
          <button className="w-full bg-blue-50 border border-blue-200 text-blue-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-blue-100 transition">
            Adoption Requests
          </button>
        </Link>
        <Link to="/shelter-staff">
          <button className="w-full bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-yellow-100 transition">
            Manage Staff
          </button>
        </Link>
        <Link to="/shelter-events">
          <button className="w-full bg-purple-50 border border-purple-200 text-purple-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-purple-100 transition">
            Organize Events
          </button>
        </Link>
        <Link to="/shelter-reports">
          <button className="w-full bg-pink-50 border border-pink-200 text-pink-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-pink-100 transition">
            Reports & Analytics
          </button>
        </Link>
        <Link to="/messages">
          <button className="w-full bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-indigo-100 transition">
            Messages
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default ShelterAdminDashboard;