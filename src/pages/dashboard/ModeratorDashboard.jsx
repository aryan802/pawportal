import React from "react";
import { Link } from "react-router-dom";

const ModeratorDashboard = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-10">
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full flex flex-col items-center relative">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Moderator Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        <Link to="/moderate-posts">
          <button className="w-full bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-indigo-100 transition">
            Moderate Community Posts
          </button>
        </Link>
        <Link to="/review-reports">
          <button className="w-full bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-yellow-100 transition">
            Review Abuse Reports
          </button>
        </Link>
        <Link to="/user-management">
          <button className="w-full bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-green-100 transition">
            Manage Users
          </button>
        </Link>
        <Link to="/moderator-messages">
          <button className="w-full bg-pink-50 border border-pink-200 text-pink-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-pink-100 transition">
            Messages
          </button>
        </Link>
        <Link to="/moderator-analytics">
          <button className="w-full bg-blue-50 border border-blue-200 text-blue-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-blue-100 transition">
            Analytics & Reports
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default ModeratorDashboard;