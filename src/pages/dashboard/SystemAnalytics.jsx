import React, { useState } from "react";
const mockAnalytics = {
  totalUsers: 48,
  owners: 30,
  shelterAdmins: 5,
  moderators: 4,
  systemAdmins: 1,
  activeUsers: 41,
  suspendedUsers: 3,
  posts: 210,
  abuseReports: 12,
  loginsToday: 22,
  recentActions: [
    { action: "User Priya Singh promoted to Shelter Admin", date: "2025-09-03" },
    { action: "Moderator Sneha Kapoor suspended user Rahul Verma", date: "2025-09-02" },
    { action: "System settings updated", date: "2025-09-01" },
  ],
  monthlySignups: [
    { month: "June", count: 8 },
    { month: "July", count: 12 },
    { month: "August", count: 15 },
    { month: "September", count: 13 },
  ],
};
const SystemAnalytics = () => {
  const [analytics] = useState(mockAnalytics);
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Analytics & Reports
        </h1>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-700">{analytics.totalUsers}</span>
            <span className="text-gray-700 text-sm mt-1">Total Users</span>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-green-700">{analytics.activeUsers}</span>
            <span className="text-gray-700 text-sm mt-1">Active Users</span>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-yellow-700">{analytics.suspendedUsers}</span>
            <span className="text-gray-700 text-sm mt-1">Suspended Users</span>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-indigo-700">{analytics.posts}</span>
            <span className="text-gray-700 text-sm mt-1">Total Posts</span>
          </div>
          <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-pink-700">{analytics.abuseReports}</span>
            <span className="text-gray-700 text-sm mt-1">Abuse Reports</span>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-700">{analytics.loginsToday}</span>
            <span className="text-gray-700 text-sm mt-1">Logins Today</span>
          </div>
        </div>
        <div className="w-full mb-8">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">User Roles</h2>
          <div className="flex flex-wrap gap-6">
            <div>
              <span className="font-semibold text-gray-700">Owners: </span>
              <span className="text-blue-700 font-bold">{analytics.owners}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Shelter Admins: </span>
              <span className="text-green-700 font-bold">{analytics.shelterAdmins}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Moderators: </span>
              <span className="text-indigo-700 font-bold">{analytics.moderators}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">System Admins: </span>
              <span className="text-pink-700 font-bold">{analytics.systemAdmins}</span>
            </div>
          </div>
        </div>
        <div className="w-full mb-8">
          <h2 className="text-lg font-semibold text-indigo-700 mb-2">Recent Actions</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {analytics.recentActions.map((item, idx) => (
              <li key={idx}>
                <span className="font-semibold">{item.action}</span> <span className="text-gray-500">({item.date})</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full">
          <h2 className="text-lg font-semibold text-yellow-700 mb-2">Monthly Signups</h2>
          <div className="flex flex-col gap-2">
            {analytics.monthlySignups.map((m, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="w-20 text-gray-700">{m.month}</span>
                <div className="flex-1 bg-yellow-100 rounded h-3">
                  <div
                    className="bg-yellow-400 h-3 rounded"
                    style={{ width: `${m.count * 5}%` }}
                  ></div>
                </div>
                <span className="w-8 text-yellow-700 font-bold text-right">{m.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SystemAnalytics;