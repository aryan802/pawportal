import React, { useState } from "react";
const mockMessages = [
  {
    id: 1,
    sender: "Amit Sharma",
    senderRole: "Adopter",
    email: "amit.sharma@email.com",
    date: "2025-09-01 10:30 AM",
    subject: "Adoption Inquiry for Bruno",
    content: "Hello, I am interested in adopting Bruno. Can I visit the shelter this weekend?",
    status: "Unread",
  },
  {
    id: 2,
    sender: "Priya Singh",
    senderRole: "Volunteer",
    email: "priya.singh@email.com",
    date: "2025-08-31 04:15 PM",
    subject: "Volunteering for Vaccination Camp",
    content: "Hi, I would like to volunteer for the upcoming vaccination camp. Please let me know the details.",
    status: "Read",
  },
  {
    id: 3,
    sender: "Rahul Verma",
    senderRole: "Adopter",
    email: "rahul.verma@email.com",
    date: "2025-08-30 09:00 AM",
    subject: "Feedback on Adoption Process",
    content: "Thank you for helping me adopt Simba. The process was smooth and the staff was very helpful.",
    status: "Read",
  },
];
const statusColors = {
  Unread: "bg-yellow-100 text-yellow-700",
  Read: "bg-green-100 text-green-700",
};
const Messages = () => {
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
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-yellow-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
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
export default Messages;