import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">PawPortal</Link>
      
      {isAuthenticated ? (
        <div className="flex items-center space-x-4">
          {/* Navigation Links - Role-based */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard" className="hover:text-blue-200 transition">
              Dashboard
            </Link>
            <Link to="/pet-listings" className="hover:text-blue-200 transition">
              Pet Listings
            </Link>
            {(user?.role === 'Pet Owner' || user?.role === 'Guest') && (
              <>
                <Link to="/mypets" className="hover:text-blue-200 transition">
                  My Pets
                </Link>
                <Link to="/health-dashboard" className="hover:text-blue-200 transition">
                  Health
                </Link>
                <Link to="/pet-analytics" className="hover:text-blue-200 transition">
                  Analytics
                </Link>
              </>
            )}
            {user?.role === 'Shelter Admin' && (
              <>
                <Link to="/manage-pets" className="hover:text-blue-200 transition">
                  Manage Pets
                </Link>
                <Link to="/adoption-requests" className="hover:text-blue-200 transition">
                  Adoption Requests
                </Link>
              </>
            )}
            {user?.role === 'Moderator' && (
              <>
                <Link to="/moderate-posts" className="hover:text-blue-200 transition">
                  Moderate Posts
                </Link>
                <Link to="/review-reports" className="hover:text-blue-200 transition">
                  Review Reports
                </Link>
              </>
            )}
            {user?.role === 'System Admin' && (
              <>
                <Link to="/system-users" className="hover:text-blue-200 transition">
                  Manage Users
                </Link>
                <Link to="/system-analytics" className="hover:text-blue-200 transition">
                  System Analytics
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 hover:text-blue-200 transition"
            >
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <span className="hidden md:block">{user?.name || 'User'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                  <p className="text-xs text-gray-400">{user?.role}</p>
                </div>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/mypets"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  My Pets
                </Link>
                <Link
                  to="/health-dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  Health Dashboard
                </Link>
                <Link
                  to="/pet-analytics"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  Pet Analytics
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Link
            to="/login"
            className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-600 transition border-2 border-pink-400"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white border-2 border-pink-400 text-pink-500 px-4 py-2 rounded-full font-semibold hover:bg-pink-50 transition ml-2"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;