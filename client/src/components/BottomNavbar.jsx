import { useNavigate } from "react-router-dom";
import {
  Home,
  Search,
  Bookmark,
  User,
  LayoutDashboard,
  PlusSquare,
  Newspaper,
} from "lucide-react";

function BottomNavbar({ isDarkMode, isAdmin, activeTab, userId }) {
  const navigate = useNavigate();

  const commonTextColor = isDarkMode ? "text-gray-400" : "text-gray-600";
  const isActive = (tab) => activeTab === tab;

  const handleNavigation = (tab) => {
    switch (tab) {
      case "dashboard":
        navigate("/admin/dashboard");
        break;
      case "create-post":
        navigate("/admin/create-post");
        break;
      case "news":
        navigate("/admin/news");
        break;
      case "profile":
        navigate(`/profile/${userId}`);
        break;
      case "home":
        navigate("/home");
        break;
      case "search":
        navigate("/search");
        break;
      case "bookmark":
        navigate("/bookmarks");
        break;
      default:
        break;
    }
  };

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 shadow-md flex justify-around py-2 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      {isAdmin ? (
        <>
          <button
            className={`flex flex-col items-center ${
              isActive("dashboard") ? "text-orange-500" : commonTextColor
            }`}
            onClick={() => handleNavigation("dashboard")}
          >
            <LayoutDashboard size={20} />
            <span className="text-xs">Dashboard</span>
          </button>

          <button
            className={`flex flex-col items-center ${
              isActive("create-post") ? "text-orange-500" : commonTextColor
            }`}
            onClick={() => handleNavigation("create-post")}
          >
            <PlusSquare size={20} />
            <span className="text-xs">Create Post</span>
          </button>

          <button
            className={`flex flex-col items-center ${
              isActive("news") ? "text-orange-500" : commonTextColor
            }`}
            onClick={() => handleNavigation("news")}
          >
            <Newspaper size={20} />
            <span className="text-xs">News</span>
          </button>

          <button
            className={`flex flex-col items-center ${
              isActive("profile") ? "text-orange-500" : commonTextColor
            }`}
            onClick={() => handleNavigation("profile")}
          >
            <User size={20} />
            <span className="text-xs">Profile</span>
          </button>
        </>
      ) : (
        <>
          <button
            className={`flex flex-col items-center ${
              isActive("home") ? "text-orange-500" : commonTextColor
            }`}
            onClick={() => handleNavigation("home")}
          >
            <Home size={20} />
            <span className="text-xs">Home</span>
          </button>

          <button
            className={`flex flex-col items-center ${
              isActive("search") ? "text-orange-500" : commonTextColor
            }`}
            onClick={() => handleNavigation("search")}
          >
            <Search size={20} />
            <span className="text-xs">Search</span>
          </button>

          <button
            className={`flex flex-col items-center ${
              isActive("bookmark") ? "text-orange-500" : commonTextColor
            }`}
            onClick={() => handleNavigation("bookmark")}
          >
            <Bookmark size={20} />
            <span className="text-xs">Bookmark</span>
          </button>

          <button
            className={`flex flex-col items-center ${
              isActive("profile") ? "text-orange-500" : commonTextColor
            }`}
            onClick={() => handleNavigation("profile")}
          >
            <User size={20} />
            <span className="text-xs">Profile</span>
          </button>
        </>
      )}
    </nav>
  );
}

export default BottomNavbar;
