import { useNavigate } from "react-router-dom";
import {
  Home,
  PlusSquare,
  Search,
  Bookmark,
  User,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { logoutAdmin } from "../api/admin";
import { toast } from "react-toastify";

function BottomNavbar({ isDarkMode, toggleDarkMode, isAdmin, activeTab, userId }) {
  const navigate = useNavigate();
  const commonTextColor = isDarkMode ? "text-gray-400" : "text-gray-600";
  const isActive = (tab) => activeTab === tab;

  const handleNavigation = (tab) => {
    if (isAdmin) {
      switch (tab) {
        case "home":
          navigate("/admin/news");
          break;
        case "create-post":
          navigate("/admin/create-post");
          break;
        default:
          break;
      }
    } else {
      switch (tab) {
        case "home":
          navigate("/home");
          break;
        case "search":
          navigate("/search");
          break;
        case "bookmark":
          navigate("/bookmarks");
          break;
        case "profile":
          navigate(`/profile/${userId}`);
          break;
        default:
          break;
      }
    }
  };

  const handleLogout = () => {
    try {
      logoutAdmin();
      navigate("/admin/login");
      toast.success("Admin Logged out");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Something went wrong!");
    }
    
  };

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 shadow-md flex justify-around py-2 z-50 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      {isAdmin ? (
        <>
          <button
            className={`flex flex-col items-center ${isActive("home") ? "text-orange-500" : commonTextColor}`}
            onClick={() => handleNavigation("home")}
          >
            <Home size={20} />
            <span className="text-xs">Home</span>
          </button>

          <button
            className={`flex flex-col items-center ${isActive("create-post") ? "text-orange-500" : commonTextColor}`}
            onClick={() => handleNavigation("create-post")}
          >
            <PlusSquare size={20} />
            <span className="text-xs">Create</span>
          </button>

          <button
            className={`flex flex-col items-center ${commonTextColor}`}
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span className="text-xs">Theme</span>
          </button>

          <button
            className={`flex flex-col items-center ${commonTextColor}`}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span className="text-xs">Logout</span>
          </button>
        </>
      ) : (
        <>
          <button
            className={`flex flex-col items-center ${isActive("home") ? "text-orange-500" : commonTextColor}`}
            onClick={() => handleNavigation("home")}
          >
            <Home size={20} />
            <span className="text-xs">Home</span>
          </button>

          <button
            className={`flex flex-col items-center ${isActive("search") ? "text-orange-500" : commonTextColor}`}
            onClick={() => handleNavigation("search")}
          >
            <Search size={20} />
            <span className="text-xs">Search</span>
          </button>

          <button
            className={`flex flex-col items-center ${isActive("bookmark") ? "text-orange-500" : commonTextColor}`}
            onClick={() => handleNavigation("bookmark")}
          >
            <Bookmark size={20} />
            <span className="text-xs">Bookmark</span>
          </button>

          <button
            className={`flex flex-col items-center ${isActive("profile") ? "text-orange-500" : commonTextColor}`}
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
