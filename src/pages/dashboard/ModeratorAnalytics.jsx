import React, { useState } from "react";
const mockAnalytics = {
  totalPosts: 120,
  pendingPosts: 7,
  approvedPosts: 105,
  rejectedPosts: 8,
  abuseReports: 5,
  usersBanned: 2,
  activeUsers: 38,
  mostActiveUser: "Priya Singh",
  mostReportedPost: {
    title: "Lost Dog in Sector 21",
    reports: 3,
    author: "Amit Sharma",
  },
  monthlyModeration: [
    { month: "June", moderated: 25 },
    { month: "July", moderated: 30 },
    { month: "August", moderated: 40 },
    { month: "September", moderated: 25 },
  ],
};
const ModeratorAnalytics = () => {
  const [analytics] = useState(mockAnalytics);
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Analytics & Reports
        </h1>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-indigo-700">{analytics.totalPosts}</span>
            <span className="text-gray-700 text-sm mt-1">Total Posts</span>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-yellow-700">{analytics.pendingPosts}</span>
            <span className="text-gray-700 text-sm mt-1">Pending Posts</span>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-green-700">{analytics.approvedPosts}</span>
            <span className="text-gray-700 text-sm mt-1">Approved Posts</span>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-red-700">{analytics.rejectedPosts}</span>
            <span className="text-gray-700 text-sm mt-1">Rejected Posts</span>
          </div>
          <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-pink-700">{analytics.abuseReports}</span>
            <span className="text-gray-700 text-sm mt-1">Abuse Reports</span>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-700">{analytics.usersBanned}</span>
            <span className="text-gray-700 text-sm mt-1">Users Banned</span>
          </div>
        </div>
        <div className="w-full mb-8">
          <h2 className="text-lg font-semibold text-indigo-700 mb-2">User Activity</h2>
          <div className="flex flex-wrap gap-6">
            <div>
              <span className="font-semibold text-gray-700">Active Users: </span>
              <span className="text-green-700 font-bold">{analytics.activeUsers}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Most Active User: </span>
              <span className="text-blue-700 font-bold">{analytics.mostActiveUser}</span>
            </div>
          </div>
        </div>
        <div className="w-full mb-8">
          <h2 className="text-lg font-semibold text-pink-700 mb-2">Most Reported Post</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col items-start">
            <span className="font-bold text-red-700">{analytics.mostReportedPost.title}</span>
            <span className="text-gray-700 text-sm">
              Reports: <span className="font-semibold">{analytics.mostReportedPost.reports}</span>
            </span>
            <span className="text-gray-700 text-sm">
              Author: <span className="text-blue-700">{analytics.mostReportedPost.author}</span>
            </span>
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-lg font-semibold text-yellow-700 mb-2">Monthly Moderation</h2>
          <div className="flex flex-col gap-2">
            {analytics.monthlyModeration.map((m, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="w-20 text-gray-700">{m.month}</span>
                <div className="flex-1 bg-yellow-100 rounded h-3">
                  <div
                    className="bg-yellow-400 h-3 rounded"
                    style={{ width: `${m.moderated * 2.5}%` }}
                  ></div>
                </div>
                <span className="w-8 text-yellow-700 font-bold text-right">{m.moderated}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModeratorAnalytics;