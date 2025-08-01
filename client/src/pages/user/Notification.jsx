import { useState } from "react";
import { ArrowLeft, Circle } from "lucide-react";
import Sidebar from "../../components/SideBar";

const sampleNotifications = [
  { id: 1, title: "Breaking News: Major earthquake...", time: "1 hr", read: false },
  { id: 2, title: "Tech Giant Unveils New...", time: "2 hr", read: false },
  { id: 3, title: "Local Elections: Voter Turnout...", time: "2 hr", read: true },
  { id: 4, title: "Sports Update: Championship...", time: "3 hr", read: false },
  { id: 5, title: "Business News: Stock Market...", time: "4 hr", read: true },
];

const Notification = () => {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Sidebar */}
      <Sidebar isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} activeTab="notification" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className={`flex items-center justify-between px-4 py-3 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5 cursor-pointer" />
            <h1 className="text-lg font-semibold">Notification</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={markAllAsRead}
              className="text-orange-500 text-sm hover:underline"
            >
              Read All
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`px-2 py-1 text-xs rounded ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {isDarkMode ? "Light" : "Dark"}
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-center justify-between px-4 py-3 border-b ${
                isDarkMode
                  ? "border-gray-700 hover:bg-gray-800"
                  : "border-gray-100 hover:bg-gray-100"
              } transition`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-orange-500 rounded-md text-white font-bold">
                  <span>📰</span>
                </div>
                <div>
                  <p className="text-sm font-medium line-clamp-1">{n.title}</p>
                  <p
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {n.time}
                  </p>
                </div>
              </div>
              {!n.read && <Circle className="w-3 h-3 text-green-500 fill-green-500" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
