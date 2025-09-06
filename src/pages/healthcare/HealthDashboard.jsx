import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { healthService, reminderService, userPetService } from "../../services/dataService";

const HealthDashboard = () => {
  const { user } = useAuth();
  const [healthRecords, setHealthRecords] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [userPets, setUserPets] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  // Load data on component mount
  useEffect(() => {
    if (user?.id) {
      const records = healthService.getHealthRecords(user.id);
      const userReminders = reminderService.getReminders(user.id);
      const pets = userPetService.getUserPets(user.id);
      
      setHealthRecords(records);
      setReminders(userReminders);
      setUserPets(pets);
    }
  }, [user?.id]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Vaccination": return "💉";
      case "Checkup": return "🩺";
      case "Treatment": return "🏥";
      case "Medication": return "💊";
      default: return "📋";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Health Dashboard</h1>
              <p className="text-gray-600">Track your pets' health records and care reminders</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </Link>
              <Link
                to="/vet-booking"
                className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: "overview", label: "Overview" },
              { key: "records", label: "Health Records" },
              { key: "reminders", label: "Reminders" }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? "border-pink-500 text-pink-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Pets</p>
                    <p className="text-2xl font-semibold text-gray-900">{userPets.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Health Records</p>
                    <p className="text-2xl font-semibold text-gray-900">{healthRecords.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Upcoming Reminders</p>
                    <p className="text-2xl font-semibold text-gray-900">{reminders.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Spent</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      ${healthRecords.reduce((sum, record) => sum + record.cost, 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Records */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Recent Health Records</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {healthRecords.slice(0, 3).map((record) => (
                    <div key={record.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <span className="text-2xl">{getTypeIcon(record.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{record.title}</h4>
                        <p className="text-sm text-gray-500">{record.petName} • {record.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${record.cost}</p>
                        <p className="text-sm text-gray-500">{record.vet}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setActiveTab("records")}
                    className="text-pink-600 hover:text-pink-700 text-sm font-medium"
                  >
                    View all records
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Health Records Tab */}
        {activeTab === "records" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">All Health Records</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {healthRecords.map((record) => (
                    <div key={record.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <span className="text-3xl">{getTypeIcon(record.type)}</span>
                          <div>
                            <h4 className="font-semibold text-gray-900">{record.title}</h4>
                            <p className="text-sm text-gray-500 mb-2">{record.petName} • {record.date}</p>
                            <p className="text-gray-600">{record.description}</p>
                            <div className="mt-2 text-sm text-gray-500">
                              <p>Vet: {record.vet} at {record.clinic}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">${record.cost}</p>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {record.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reminders Tab */}
        {activeTab === "reminders" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Care Reminders</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {reminders.map((reminder) => (
                    <div key={reminder.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl">{getTypeIcon(reminder.type)}</span>
                          <div>
                            <h4 className="font-semibold text-gray-900">{reminder.title}</h4>
                            <p className="text-sm text-gray-500">{reminder.petName} • Due: {reminder.dueDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(reminder.priority)}`}>
                            {reminder.priority} priority
                          </span>
                          <button className="bg-pink-500 text-white px-3 py-1 rounded text-sm hover:bg-pink-600 transition">
                            Schedule
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthDashboard;
