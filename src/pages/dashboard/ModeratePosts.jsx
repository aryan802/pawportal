import React, { useState } from "react";
const mockPosts = [
  {
    id: 1,
    author: "Amit Sharma",
    date: "2025-09-01",
    title: "Lost Dog in Sector 21",
    content: "My Labrador Bruno is missing since yesterday evening. Please contact if found.",
    status: "Pending",
    reports: 2,
    category: "Lost & Found",
  },
  {
    id: 2,
    author: "Priya Singh",
    date: "2025-08-30",
    title: "Best food for Persian cats?",
    content: "Can anyone suggest good food brands for Persian cats? My Misty is a picky eater.",
    status: "Approved",
    reports: 0,
    category: "Nutrition",
  },
  {
    id: 3,
    author: "Rahul Verma",
    date: "2025-08-29",
    title: "Dog park meet-up this Sunday",
    content: "Let's meet at Cubbon Park with our pets at 8 AM. All are welcome!",
    status: "Rejected",
    reports: 1,
    category: "Activities",
  },
];
const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};
const ModeratePosts = () => {
  const [posts, setPosts] = useState(mockPosts);
  const handleApprove = (id) => {
    setPosts(posts.map((post) =>
      post.id === id ? { ...post, status: "Approved" } : post
    ));
  };
  const handleReject = (id) => {
    setPosts(posts.map((post) =>
      post.id === id ? { ...post, status: "Rejected" } : post
    ));
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Moderate Community Posts
        </h1>
        <div className="w-full flex flex-col gap-6">
          {posts.length === 0 && (
            <div className="text-gray-500 text-center">No posts to moderate.</div>
          )}
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col shadow"
            >
              <div className="flex flex-wrap items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-indigo-700">{post.title}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[post.status] || "bg-gray-100 text-gray-700"}`}>
                    {post.status}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>
              <div className="mb-1 text-gray-700">{post.content}</div>
              <div className="text-sm text-gray-600 mb-2">
                By <span className="font-semibold text-pink-600">{post.author}</span>
                {post.reports > 0 && (
                  <span className="ml-4 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">
                    {post.reports} Report{post.reports > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {post.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(post.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-600 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(post.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-yellow-600 transition"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDelete(post.id)}
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
export default ModeratePosts;