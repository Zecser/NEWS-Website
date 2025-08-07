import { useEffect, useState } from "react";
import { ArrowLeft, Circle, BellOff } from "lucide-react";
import Sidebar from "../../components/SideBar";
import { getNotificationAPI, getUserProfile } from "../../api/auth";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch notifications & user status
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getNotificationAPI();
        const user = await getUserProfile();

        console.log(user);

        setNotifications(res.data || []);
        setNotificationsEnabled(user.notificationsEnabled);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  return (
    <div
      className={`min-h-screen flex ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Sidebar
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        activeTab="notification"
      />

      <div className="flex-1 flex flex-col">
        <div
          className={`flex items-center justify-between px-4 py-3 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Notifications</h1>
            {notificationsEnabled === false && (
              <BellOff className="w-5 h-5 text-red-500" title="Notifications Disabled" />
            )}
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

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <p className="p-4">Loading...</p>
          ) : notifications.length === 0 ? (
            <p className="p-4 text-gray-500">No notifications yet.</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`flex items-center justify-between px-4 py-3 border-b ${
                  isDarkMode
                    ? "border-gray-700 hover:bg-gray-800"
                    : "border-gray-100 hover:bg-gray-100"
                } transition`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-orange-500 rounded-md text-white font-bold">
                    📰
                  </div>
                  <div>
                    <p className="text-sm font-medium line-clamp-1">
                      {n.message}
                    </p>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {new Date(n.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                {!n.read && (
                  <Circle className="w-3 h-3 text-green-500 fill-green-500" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
