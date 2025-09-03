import React, { useState } from "react";

const mockMessages = [
  {
    id: 1,
    sender: "Amit Sharma",
    senderRole: "Owner",
    email: "amit.sharma@email.com",
    date: "2025-09-01 11:15 AM",
    subject: "Post Approval Query",
    content: "Hello Moderator, my post about lost dog is still pending. Can you please review it?",
    status: "Unread",
  },
  {
    id: 2,
    sender: "Priya Singh",
    senderRole: "Shelter Admin",
    email: "priya.singh@email.com",
    date: "2025-08-31 03:40 PM",
    subject: "Abuse Report Follow-up",
    content: "Hi, I reported a post for inappropriate content. Please let me know the action taken.",
    status: "Read",
  },
  {
    id: 3,
    sender: "Rahul Verma",
    senderRole: "Owner",
    email: "rahul.verma@email.com",
    date: "2025-08-30 09:55 AM",
    subject: "Thank you for quick moderation",
    content: "Thanks for removing the spam post from the forums. Appreciate your work!",
    status: "Read",
  },
];

const statusColors = {
  Unread: "bg-yellow-100 text-yellow-700",
  Read: "bg-green-100 text-green-700",
};

const ModeratorMessages = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => {
    setSelected(id);
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, status: "Read" } : msg
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setMessages(messages.filter((msg) => msg.id !== id));
      if (selected === id) setSelected(null);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-indigo-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-pink-700 mb-6 text-center">
          Messages
        </h1>
        <div className="w-full flex flex-col md:flex-row gap-6">
          {/* Message List */}
          <div className="w-full md:w-1/2">
            <h2 className="text-lg font-semibold text-indigo-600 mb-2">Inbox</h2>
            <div className="flex flex-col gap-3">
              {messages.length === 0 && (
                <div className="text-gray-500 text-center">No messages.</div>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`cursor-pointer border rounded-xl p-3 shadow-sm hover:shadow transition flex flex-col ${selected === msg.id ? "bg-indigo-50 border-indigo-300" : "bg-gray-50 border-gray-200"}`}
                  onClick={() => handleSelect(msg.id)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-indigo-700">{msg.subject}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[msg.status] || "bg-gray-100 text-gray-700"}`}>
                      {msg.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    From: <span className="font-semibold text-blue-700">{msg.sender}</span> ({msg.senderRole})
                  </div>
                  <div className="text-xs text-gray-400">{msg.date}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Message Details */}
          <div className="w-full md:w-1/2">
            <h2 className="text-lg font-semibold text-indigo-600 mb-2">Details</h2>
            {selected ? (
              (() => {
                const msg = messages.find((m) => m.id === selected);
                if (!msg) return null;
                return (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow flex flex-col gap-2">
                    <div className="font-bold text-indigo-700 text-lg mb-1">{msg.subject}</div>
                    <div className="text-sm text-gray-600 mb-1">
                      From: <span className="font-semibold text-blue-700">{msg.sender}</span> ({msg.senderRole})
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      Email: <span className="text-gray-800">{msg.email}</span>
                    </div>
                    <div className="text-xs text-gray-400 mb-2">{msg.date}</div>
                    <div className="text-gray-700 mb-2">{msg.content}</div>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-full text-xs font-semibold hover:bg-red-600 transition self-end"
                    >
                      Delete
                    </button>
                  </div>
                );
              })()
            ) : (
              <div className="text-gray-500 text-center mt-8">Select a message to view details.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorMessages;