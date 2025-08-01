import { Home, Search, LogOut, Sun, Moon, PlusSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Bookmark, Bell, User } from "lucide-react";

function Sidebar({ isDarkMode, activeTab, toggleDarkMode, userId, isAdmin, handleLogout }) {
  const navigate = useNavigate();
  const commonTextColor = isDarkMode ? "text-gray-300" : "text-gray-800";

  // Menu items based on role
  const menuItems = isAdmin
    ? [
        { label: "Home", icon: Home, tab: "home", path: "/admin/news" },
        // { label: "Search", icon: Search, tab: "search", path: "/admin/search" },
        { label: "Create Post", icon: PlusSquare, tab: "create-post", path: "/admin/create-post" },
      ]
    : [
        { label: "Home", icon: Home, tab: "home", path: "/home" },
        { label: "Search", icon: Search, tab: "search", path: "/search" },
        { label: "Notification", icon: Bell, tab: "notification", path: "/notifications" },
        { label: "Bookmark", icon: Bookmark, tab: "bookmark", path: "/bookmarks" },
        { label: "Profile", icon: User, tab: "profile", path: `/profile/${userId}` },
      ];

  return (
    <aside
      className={`hidden md:flex flex-col justify-between w-64 h-screen p-5 shadow-lg ${
        isDarkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-800"
      }`}
    >
      {/* ✅ Top Section */}
      <div>
        <h1 className="text-xl font-bold mb-8">{isAdmin ? "Admin Panel" : "Logo"}</h1>
        <nav className="flex flex-col gap-5">
          {menuItems.map(({ label, icon: Icon, tab, path }) => (
            <button
              key={tab}
              onClick={() => navigate(path)}
              className={`flex items-center gap-3 rounded-md px-2 py-2 transition-colors ${
                activeTab === tab
                  ? "text-orange-500 bg-orange-50"
                  : `hover:text-orange-500 hover:bg-gray-100 ${commonTextColor}`
              } ${isDarkMode ? "hover:bg-gray-700" : ""}`}
            >
              <Icon size={20} /> {label}
            </button>
          ))}
        </nav>
      </div>

      {/* ✅ Bottom Section */}
      <div className="flex flex-col gap-3">
        <button
          onClick={toggleDarkMode}
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            isDarkMode
              ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {isAdmin && (
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isDarkMode
                ? "bg-red-700 text-white hover:bg-red-600"
                : "bg-red-100 text-red-600 hover:bg-red-200"
            }`}
          >
            <LogOut size={18} />
            Logout
          </button>
        )}

        <div className="text-xs text-gray-400 mt-2">
          <p>Help & Information</p>
          <p>© 2025 Name</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
