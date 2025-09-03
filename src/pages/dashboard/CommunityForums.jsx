import React, { useState } from "react";

const mockThreads = [
  {
    id: 1,
    title: "Best food brands for puppies?",
    author: "Amit Sharma",
    date: "2025-08-30",
    replies: 8,
    lastReply: "2025-09-01",
    category: "Nutrition",
    excerpt: "What are some good and affordable food brands for a 3-month-old Labrador puppy? Any recommendations from experience?",
  },
  {
    id: 2,
    title: "How to train a rescued dog to trust humans?",
    author: "Priya Singh",
    date: "2025-08-28",
    replies: 12,
    lastReply: "2025-08-31",
    category: "Training",
    excerpt: "I recently adopted a rescued Indie dog. She is very scared and hides from everyone. How can I help her trust us?",
  },
  {
    id: 3,
    title: "Lost pet alert: Beagle in MG Road, Bengaluru",
    author: "Ankit Verma",
    date: "2025-08-29",
    replies: 3,
    lastReply: "2025-08-30",
    category: "Lost & Found",
    excerpt: "My beagle Simba has been missing since 20th Aug. Last seen near MG Road. Please help if you have any info.",
  },
  {
    id: 4,
    title: "Affordable vet clinics in Mumbai?",
    author: "Rohit Mehra",
    date: "2025-08-27",
    replies: 6,
    lastReply: "2025-08-29",
    category: "Healthcare",
    excerpt: "Can anyone suggest reliable and affordable vet clinics in Mumbai for regular checkups and vaccinations?",
  },
  {
    id: 5,
    title: "Dog parks and play areas in Delhi NCR",
    author: "Sneha Kapoor",
    date: "2025-08-25",
    replies: 10,
    lastReply: "2025-08-28",
    category: "Activities",
    excerpt: "Looking for safe dog parks or play areas in Delhi NCR where I can take my golden retriever. Suggestions?",
  },
];

const categoryColors = {
  Nutrition: "bg-yellow-100 text-yellow-700",
  Training: "bg-blue-100 text-blue-700",
  "Lost & Found": "bg-green-100 text-green-700",
  Healthcare: "bg-pink-100 text-pink-700",
  Activities: "bg-purple-100 text-purple-700",
};

const CommunityForums = () => {
  const [threads] = useState(mockThreads);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-blue-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full flex flex-col items-center relative">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">
          Community Forums
        </h1>
        <p className="text-gray-500 text-center mb-8 max-w-2xl">
          Ask questions, share experiences, and connect with other pet lovers. Browse trending topics or start a new discussion!
        </p>
        <div className="w-full flex justify-end mb-4">
          <button className="bg-pink-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-pink-600 transition shadow">
            + Start New Thread
          </button>
        </div>
        <div className="w-full flex flex-col gap-4">
          {threads.map((thread) => (
            <div
              key={thread.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow hover:shadow-lg transition"
            >
              <div className={`px-3 py-1 rounded-full text-xs font-semibold mb-2 sm:mb-0 ${categoryColors[thread.category]}`}>
                {thread.category}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-blue-700 mb-1">{thread.title}</h2>
                <p className="text-gray-700 mb-1">{thread.excerpt}</p>
                <div className="text-xs text-gray-500">
                  By <span className="font-semibold text-pink-600">{thread.author}</span> &middot; {thread.date} &middot; Last reply: {thread.lastReply}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-600 font-semibold">
                  {thread.replies} Replies
                </span>
                <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-600 transition">
                  View Thread
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityForums;