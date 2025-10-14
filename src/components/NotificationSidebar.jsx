import React from "react";

function NotificationSidebar({ isOpen, onClose, notifications }) {
  const newNotifications = notifications.filter((n) => n.isNew);
  const oldNotifications = notifications.filter((n) => !n.isNew);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg border-l border-gray-300 z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 text-xl"
        >
          ✕
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications</p>
        ) : (
          <>
            {newNotifications.length === 0 ? (
              <p className="text-gray-500 mb-2">No new notifications</p>
            ) : (
              <div className="mb-4">
                <p className="text-gray-700 font-semibold mb-2">New</p>
                <ul className="space-y-2">
                  {newNotifications.map((n) => (
                    <li key={n.id} className="bg-blue-50 p-2 rounded text-sm">
                      {n.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
{/*  */}
            <div>
              <p className="text-gray-700 font-semibold mb-2">Older</p>
              <ul className="space-y-2">
                {oldNotifications.map((n) => (
                  <li key={n.id} className="text-sm text-gray-600">
                    {n.text}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NotificationSidebar;
    