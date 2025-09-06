import React, { useState } from "react";
import { Link } from "react-router-dom";

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: "health",
    title: "Bella's Vaccination Due",
    message: "Bella's annual vaccination is due in 3 days. Schedule an appointment now.",
    time: "2 hours ago",
    isRead: false,
    actionUrl: "/vet-booking"
  },
  {
    id: 2,
    type: "adoption",
    title: "Adoption Application Update",
    message: "Your application for Max has been approved! Contact the shelter to proceed.",
    time: "1 day ago",
    isRead: false,
    actionUrl: "/adoption-status"
  },
  {
    id: 3,
    type: "community",
    title: "New Forum Reply",
    message: "Sarah replied to your post about dog training tips.",
    time: "2 days ago",
    isRead: true,
    actionUrl: "/community-forums"
  },
  {
    id: 4,
    type: "event",
    title: "Pet Meetup Tomorrow",
    message: "Don't forget about the community pet meetup at Central Park tomorrow at 2 PM.",
    time: "3 days ago",
    isRead: true,
    actionUrl: "/events"
  },
  {
    id: 5,
    type: "system",
    title: "Welcome to PawPortal!",
    message: "Thank you for joining PawPortal. Explore our features and find your perfect pet companion.",
    time: "1 week ago",
    isRead: true,
    actionUrl: "/dashboard"
  }
];

const getNotificationIcon = (type) => {
  switch (type) {
    case "health":
      return "🏥";
    case "adoption":
      return "🐾";
    case "community":
      return "👥";
    case "event":
      return "📅";
    case "system":
      return "🔔";
    default:
      return "📢";
  }
};

const getNotificationColor = (type) => {
  switch (type) {
    case "health":
      return "bg-green-100 text-green-800";
    case "adoption":
      return "bg-blue-100 text-blue-800";
    case "community":
      return "bg-purple-100 text-purple-800";
    case "event":
      return "bg-orange-100 text-orange-800";
    case "system":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const NotificationsPanel = ({ onClose }) => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "unread") return !notification.isRead;
    if (filter === "read") return notification.isRead;
    return true;
  });

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose}></div>
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b">
            {[
              { key: "all", label: "All" },
              { key: "unread", label: "Unread" },
              { key: "read", label: "Read" }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex-1 px-4 py-2 text-sm font-medium ${
                  filter === tab.key
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>No notifications found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredNotifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !notification.isRead ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${
                            !notification.isRead ? "text-gray-900" : "text-gray-700"
                          }`}>
                            {notification.title}
                          </p>
                          <div className="flex items-center space-x-2">
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {notification.time}
                          </span>
                          
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getNotificationColor(notification.type)}`}>
                              {notification.type}
                            </span>
                            
                            {notification.actionUrl && (
                              <Link
                                to={notification.actionUrl}
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-blue-600 hover:text-blue-800"
                              >
                                View
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50">
            <Link
              to="/notifications"
              className="block w-full text-center text-sm text-blue-600 hover:text-blue-800"
            >
              View all notifications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;
