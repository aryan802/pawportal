import React from "react";
import { Link } from "react-router-dom";

const OwnerDashboard = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50 py-10">
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full flex flex-col items-center relative">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Owner Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        <Link to="/settings">
          <button className="w-full bg-gray-50 border border-gray-200 text-gray-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-gray-100 transition">
            System Settings
          </button>
        </Link>
        <Link to="/pet-tracking">
          <button className="w-full bg-blue-50 border border-blue-200 text-blue-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-blue-100 transition">
            Pet Tracking <br />
            <span className="text-xs font-normal">(Healthcare, Reminders, Care Tasks)</span>
          </button>
        </Link>
        <Link to="/marketplace">
          <button className="w-full bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-yellow-100 transition">
            Sell/Buy Pet
          </button>
        </Link>
        <Link to="/pet-walker">
          <button className="w-full bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-green-100 transition">
            Hire a Pet Walker
          </button>
        </Link>
        <Link to="/vet-booking">
          <button className="w-full bg-purple-50 border border-purple-200 text-purple-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-purple-100 transition">
            Online Vet Bookings
          </button>
        </Link>
        <Link to="/insurance">
          <button className="w-full bg-pink-50 border border-pink-200 text-pink-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-pink-100 transition">
            Pet Insurance Comparisons
          </button>
        </Link>
        <Link to="/trainers">
          <button className="w-full bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-4 rounded-xl font-semibold shadow hover:bg-indigo-100 transition">
            Access Training Professionals
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default OwnerDashboard;