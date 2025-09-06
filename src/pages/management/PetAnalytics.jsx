import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { userPetService, healthService, reminderService } from "../../services/dataService";

const PetAnalytics = () => {
  const { user } = useAuth();
  const [userPets, setUserPets] = useState([]);
  const [healthRecords, setHealthRecords] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [timeRange, setTimeRange] = useState("6months");

  // Load data on component mount
  useEffect(() => {
    if (user?.id) {
      const pets = userPetService.getUserPets(user.id);
      const records = healthService.getHealthRecords(user.id);
      const userReminders = reminderService.getReminders(user.id);
      
      setUserPets(pets);
      setHealthRecords(records);
      setReminders(userReminders);
      
      if (pets.length > 0) {
        setSelectedPet(pets[0]);
      }
    }
  }, [user?.id]);

  // Calculate analytics data
  const getAnalyticsData = () => {
    if (!selectedPet) return null;

    const petRecords = healthRecords.filter(record => record.petName === selectedPet.name);
    const petReminders = reminders.filter(reminder => reminder.petName === selectedPet.name);
    
    const totalSpent = petRecords.reduce((sum, record) => sum + (record.cost || 0), 0);
    const avgCostPerVisit = petRecords.length > 0 ? totalSpent / petRecords.length : 0;
    
    const upcomingReminders = petReminders.filter(reminder => 
      new Date(reminder.dueDate) > new Date() && reminder.isActive
    );
    
    const overdueReminders = petReminders.filter(reminder => 
      new Date(reminder.dueDate) < new Date() && reminder.isActive
    );

    return {
      totalSpent,
      avgCostPerVisit,
      totalVisits: petRecords.length,
      upcomingReminders: upcomingReminders.length,
      overdueReminders: overdueReminders.length,
      healthScore: calculateHealthScore(petRecords, petReminders)
    };
  };

  const calculateHealthScore = (records, reminders) => {
    // Simple health score calculation based on recent visits and overdue reminders
    let score = 100;
    
    // Deduct points for overdue reminders
    const overdueCount = reminders.filter(reminder => 
      new Date(reminder.dueDate) < new Date() && reminder.isActive
    ).length;
    score -= overdueCount * 10;
    
    // Add points for recent health visits
    const recentVisits = records.filter(record => {
      const visitDate = new Date(record.date);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return visitDate > sixMonthsAgo;
    }).length;
    score += recentVisits * 5;
    
    return Math.max(0, Math.min(100, score));
  };

  const getHealthScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getHealthScoreBg = (score) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  const analyticsData = getAnalyticsData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Pet Analytics</h1>
              <p className="text-gray-600">Track your pets' health trends and insights</p>
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
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {userPets.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pets to analyze</h3>
            <p className="text-gray-500 mb-4">Add your first pet to start tracking analytics</p>
            <Link
              to="/mypets"
              className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
            >
              Add Your First Pet
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Pet Selector */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Pet</h3>
              <div className="flex flex-wrap gap-3">
                {userPets.map((pet) => (
                  <button
                    key={pet.id}
                    onClick={() => setSelectedPet(pet)}
                    className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition ${
                      selectedPet?.id === pet.id
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{pet.name}</p>
                      <p className="text-sm text-gray-500">{pet.breed}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {selectedPet && analyticsData && (
              <>
                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Total Spent</p>
                        <p className="text-2xl font-semibold text-gray-900">${analyticsData.totalSpent.toFixed(2)}</p>
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
                        <p className="text-sm font-medium text-gray-500">Health Score</p>
                        <p className={`text-2xl font-semibold ${getHealthScoreColor(analyticsData.healthScore)}`}>
                          {analyticsData.healthScore}/100
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Total Visits</p>
                        <p className="text-2xl font-semibold text-gray-900">{analyticsData.totalVisits}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Avg Cost/Visit</p>
                        <p className="text-2xl font-semibold text-gray-900">${analyticsData.avgCostPerVisit.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Health Score Breakdown */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Score Breakdown</h3>
                  <div className="flex items-center space-x-4">
                    <div className={`w-24 h-24 rounded-full ${getHealthScoreBg(analyticsData.healthScore)} flex items-center justify-center`}>
                      <span className={`text-2xl font-bold ${getHealthScoreColor(analyticsData.healthScore)}`}>
                        {analyticsData.healthScore}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">Overall Health Score</h4>
                      <p className="text-gray-600 mb-4">
                        Based on recent vet visits, overdue reminders, and care compliance.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Upcoming Reminders:</span>
                          <span className="font-medium">{analyticsData.upcomingReminders}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Overdue Reminders:</span>
                          <span className={`font-medium ${analyticsData.overdueReminders > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {analyticsData.overdueReminders}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Health Records */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Health Records</h3>
                  <div className="space-y-4">
                    {healthRecords
                      .filter(record => record.petName === selectedPet.name)
                      .slice(0, 5)
                      .map((record) => (
                        <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{record.title}</h4>
                              <p className="text-sm text-gray-500">{record.date} • {record.vet}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${record.cost}</p>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {record.type}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
                  <div className="space-y-3">
                    {analyticsData.overdueReminders > 0 && (
                      <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                        <svg className="w-5 h-5 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <div>
                          <h4 className="font-medium text-red-900">Overdue Reminders</h4>
                          <p className="text-sm text-red-700">
                            You have {analyticsData.overdueReminders} overdue reminders. Schedule appointments to maintain your pet's health.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {analyticsData.healthScore >= 80 && (
                      <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                        <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <h4 className="font-medium text-green-900">Excellent Health Management</h4>
                          <p className="text-sm text-green-700">
                            Great job! Your pet's health is well-maintained. Keep up the regular checkups and care.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {analyticsData.totalVisits === 0 && (
                      <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <h4 className="font-medium text-yellow-900">Schedule First Checkup</h4>
                          <p className="text-sm text-yellow-700">
                            Consider scheduling your pet's first health checkup to establish a baseline and start tracking health records.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PetAnalytics;
