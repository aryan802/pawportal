import React, { useState } from "react";

const mockReports = [
  {
    id: 1,
    reportedBy: "Priya Singh",
    date: "2025-09-01",
    postTitle: "Lost Dog in Sector 21",
    postAuthor: "Amit Sharma",
    reason: "Spam / Irrelevant",
    details: "This post has been repeated multiple times in the forum.",
    status: "Pending",
  },
  {
    id: 2,
    reportedBy: "Rahul Verma",
    date: "2025-08-30",
    postTitle: "Dog park meet-up this Sunday",
    postAuthor: "Rahul Verma",
    reason: "Inappropriate Content",
    details: "Contains off-topic and promotional content.",
    status: "Reviewed",
  },
  {
    id: 3,
    reportedBy: "Sneha Kapoor",
    date: "2025-08-29",
    postTitle: "Best food for Persian cats?",
    postAuthor: "Priya Singh",
    reason: "Abusive Language",
    details: "Some replies contain rude comments.",
    status: "Pending",
  },
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Reviewed: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const ReviewReports = () => {
  const [reports, setReports] = useState(mockReports);

  const handleReview = (id) => {
    setReports(
      reports.map((r) =>
        r.id === id ? { ...r, status: "Reviewed" } : r
      )
    );
  };

  const handleReject = (id) => {
    setReports(
      reports.map((r) =>
        r.id === id ? { ...r, status: "Rejected" } : r
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      setReports(reports.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-indigo-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-yellow-700 mb-6 text-center">
          Review Abuse Reports
        </h1>
        <div className="w-full flex flex-col gap-6">
          {reports.length === 0 && (
            <div className="text-gray-500 text-center">No abuse reports to review.</div>
          )}
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col shadow"
            >
              <div className="flex flex-wrap items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-yellow-700">{report.postTitle}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[report.status] || "bg-gray-100 text-gray-700"}`}>
                    {report.status}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{report.date}</span>
              </div>
              <div className="mb-1 text-gray-700">
                <span className="font-semibold text-gray-700">Reported By:</span>{" "}
                <span className="text-blue-700">{report.reportedBy}</span>
              </div>
              <div className="mb-1 text-gray-700">
                <span className="font-semibold text-gray-700">Post Author:</span>{" "}
                <span className="text-pink-700">{report.postAuthor}</span>
              </div>
              <div className="mb-1 text-gray-700">
                <span className="font-semibold text-gray-700">Reason:</span>{" "}
                <span className="text-red-700">{report.reason}</span>
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold text-gray-700">Details:</span>{" "}
                {report.details}
              </div>
              <div className="flex gap-2">
                {report.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleReview(report.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-600 transition"
                    >
                      Mark as Reviewed
                    </button>
                    <button
                      onClick={() => handleReject(report.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-yellow-600 transition"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDelete(report.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewReports;