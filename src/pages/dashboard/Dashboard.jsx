import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NotificationsPanel from "../../components/NotificationPanel";

// Feature cards data
const featureCards = [
  {
    id: 1,
    title: "Pet Adoption",
    description: "Find your perfect furry companion",
    icon: "🐾",
    color: "from-blue-500 to-blue-600",
    hoverColor: "from-blue-600 to-blue-700",
    link: "/pet-listings",
    stats: "150+ pets available"
  },
  {
    id: 2,
    title: "Healthcare",
    description: "Track your pet's health records",
    icon: "🏥",
    color: "from-green-500 to-green-600",
    hoverColor: "from-green-600 to-green-700",
    link: "/health-dashboard",
    stats: "24/7 health monitoring"
  },
  {
    id: 3,
    title: "Pet Profiles",
    description: "Manage your pet's information",
    icon: "📋",
    color: "from-purple-500 to-purple-600",
    hoverColor: "from-purple-600 to-purple-700",
    link: "/mypets",
    stats: "Complete pet profiles"
  },
  {
    id: 4,
    title: "Analytics",
    description: "Insights about your pet's wellbeing",
    icon: "📊",
    color: "from-orange-500 to-orange-600",
    hoverColor: "from-orange-600 to-orange-700",
    link: "/pet-analytics",
    stats: "Smart insights"
  },
  {
    id: 5,
    title: "Community",
    description: "Connect with other pet owners",
    icon: "👥",
    color: "from-pink-500 to-pink-600",
    hoverColor: "from-pink-600 to-pink-700",
    link: "/community-forums",
    stats: "Active community"
  },
  {
    id: 6,
    title: "Services",
    description: "Vet booking, insurance & more",
    icon: "🛠️",
    color: "from-indigo-500 to-indigo-600",
    hoverColor: "from-indigo-600 to-indigo-700",
    link: "/vet-booking",
    stats: "Professional services"
  }
];

// Quick actions data
const quickActions = [
  {
    id: 1,
    title: "Lost Pet",
    icon: "🔍",
    link: "/lost-found",
    urgent: true
  },
  {
    id: 2,
    title: "Emergency Vet",
    icon: "🚨",
    link: "/emergency-vet",
    urgent: true
  },
  {
    id: 3,
    title: "Schedule Appointment",
    icon: "📅",
    link: "/vet-booking",
    urgent: false
  },
  {
    id: 4,
    title: "Pet Insurance",
    icon: "🛡️",
    link: "/insurance",
    urgent: false
  }
];

// Mock upcoming reminders
const upcomingReminders = [
  {
    id: 1,
    title: "Bella's Vaccination",
    time: "Tomorrow 2:00 PM",
    type: "health",
    pet: "Bella"
  },
  {
    id: 2,
    title: "Max's Grooming",
    time: "Friday 10:00 AM",
    type: "grooming",
    pet: "Max"
  },
  {
    id: 3,
    title: "Luna's Checkup",
    time: "Next Monday 3:30 PM",
    type: "health",
    pet: "Luna"
  }
];

const GuestDashboard = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50 py-10">
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full flex flex-col items-center relative">
      {/* Pet Illustration (SVG) */}
      <div className="mb-6">
        <svg width="90" height="50" viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="90" cy="90" rx="80" ry="10" fill="#F3F4F6" />
          <circle cx="60" cy="60" r="30" fill="#FF6B6B" />
          <circle cx="120" cy="60" r="30" fill="#FDE68A" />
          <ellipse cx="60" cy="80" rx="18" ry="8" fill="#fff" />
          <ellipse cx="120" cy="80" rx="18" ry="8" fill="#fff" />
          <circle cx="55" cy="55" r="4" fill="#222" />
          <circle cx="65" cy="55" r="4" fill="#222" />
          <circle cx="115" cy="55" r="4" fill="#222" />
          <circle cx="125" cy="55" r="4" fill="#222" />
          <rect x="57" y="70" width="6" height="8" rx="3" fill="#222" />
          <rect x="117" y="70" width="6" height="8" rx="3" fill="#222" />
        </svg>
      </div>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2 text-center">
        We'll take care of your <span className="text-pink-500">PETS</span>
      </h1>
      <p className="text-gray-500 text-center mb-6 max-w-md">
        PawPortal is your one-stop platform for pet adoption, care, and community. Sign up or log in to access personalized features!
      </p>
      <div className="flex gap-4 mb-8">
        <Link to="/login">
          <button className="bg-pink-500 text-white px-8 py-2 rounded-full font-semibold text-lg border-2 border-pink-400 hover:bg-pink-600 transition shadow">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-white border-2 border-pink-400 text-pink-500 px-8 py-2 rounded-full font-semibold text-lg hover:bg-pink-50 transition shadow">
            Sign Up
          </button>
        </Link>
      </div>
      
      {/* Basic Info for Guests */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 w-full">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">What you can do with PawPortal:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div className="flex items-center space-x-2">
            <span className="text-blue-600">🐾</span>
            <span>Browse and adopt pets from local shelters</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-600">🏥</span>
            <span>Track your pet's health records and appointments</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-600">👥</span>
            <span>Connect with other pet owners in the community</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-600">📊</span>
            <span>Get insights about your pet's wellbeing</span>
          </div>
        </div>
        <p className="text-blue-700 mt-4 text-center">
          <strong>Sign up or login to access all features and start managing your pet's care!</strong>
        </p>
      </div>
    </div>
  </div>
);

const AuthenticatedDashboard = () => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-gray-600">Here's what's happening with your pets today</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-full"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Feature Cards */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Access</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featureCards.map((card) => (
                  <Link key={card.id} to={card.link}>
                    <div className={`bg-gradient-to-r ${card.color} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl">{card.icon}</span>
                        <span className="text-xs opacity-75">{card.stats}</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
                      <p className="text-sm opacity-90">{card.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <Link key={action.id} to={action.link}>
                    <div className={`p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md ${
                      action.urgent 
                        ? 'border-red-200 bg-red-50 hover:bg-red-100' 
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}>
                      <div className="text-center">
                        <span className="text-2xl mb-2 block">{action.icon}</span>
                        <span className={`text-sm font-medium ${
                          action.urgent ? 'text-red-700' : 'text-gray-700'
                        }`}>
                          {action.title}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Reminders */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Reminders</h3>
              <div className="space-y-3">
                {upcomingReminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      reminder.type === 'health' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{reminder.title}</p>
                      <p className="text-xs text-gray-500">{reminder.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/care-reminders" className="block mt-4 text-center text-sm text-pink-600 hover:text-pink-700">
                View all reminders
              </Link>
            </div>

            {/* Pet Stats */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Pets</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Pets</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Health Records</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Upcoming Appointments</span>
                  <span className="font-semibold">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <NotificationsPanel onClose={() => setShowNotifications(false)} />
      )}
    </div>
  );
};

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? <AuthenticatedDashboard /> : <GuestDashboard />;
};

export default Dashboard;