import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Share2,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Edit,
  Moon,
  Sun,
  Bookmark as BookmarkIcon,
  Play,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Sidebar from "../../components/SideBar";
import BottomNavbar from "../../components/BottomNavbar";
import { baseURL } from "../../api/axios";

const Bookmark = () => {
  const { user } = useContext(AuthContext);
  const userId = user?._id;

  const [bookmarks, setBookmarks] = useState([]);
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${baseURL}/bookmarks/${userId}`
        );
        const fetched = res.data;
        setBookmarks(fetched);
        setSelectedBookmark(fetched[0] || null);
      } catch (err) {
        toast.error("Failed to load bookmarks.", err);
        setError("Failed to load bookmarks.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBookmarks();
    } else {
      setLoading(false);
      setError("You must be logged in to view bookmarks.");
    }
  }, [userId]);

  const handleDelete = async (bookmarkId) => {
    try {
      await axios.delete(`${baseURL}/bookmarks/${bookmarkId}`);
      setBookmarks((prev) => prev.filter((b) => b._id !== bookmarkId));
      if (selectedBookmark?._id === bookmarkId) {
        setSelectedBookmark(null);
        toast.success("Bookmark deleted");
      }
    } catch {
      toast.error("Failed to delete bookmark");
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleEditMode = () => setIsEditMode(!isEditMode);
  const selectedArticle = selectedBookmark?.articleId;

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Sidebar */}
      <div className="hidden md:block md:w-[260px] border-r">
        <Sidebar
          isDarkMode={darkMode}
          activeTab="bookmark"
          toggleDarkMode={toggleDarkMode}
          userId={userId}
          isAdmin={false}
        />
      </div>

      {/* Left Column - Bookmark List */}
      <div className="md:w-1/4 w-full border-r p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Bookmarks</h2>
          <div className="flex gap-2">
            <button onClick={toggleEditMode} title="Toggle Edit Mode">
              <Edit className="w-5 h-5" />
            </button>
            <button onClick={toggleDarkMode} title="Toggle Dark Mode">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading bookmarks...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          bookmarks.map((item) => {
            const article = item.articleId;
            return (
              <div
                key={item._id}
                className="flex items-start justify-between group mb-3"
              >
                <div
                  className={`cursor-pointer p-3 rounded w-full hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    selectedBookmark?._id === item._id
                      ? "bg-gray-300 dark:bg-gray-800"
                      : ""
                  }`}
                  onClick={() => !isEditMode && setSelectedBookmark(item)}
                >
                  <h3 className="font-medium">{article.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {article.category}
                  </p>
                </div>
                {isEditMode && (
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-700 ml-2 mt-2"
                    title="Delete Bookmark"
                  >
                    ✖
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Right Column - Article View */}
      <div className="flex-1 p-4 overflow-y-auto">
        {selectedArticle ? (
          <div>
            <button
              onClick={() => setSelectedBookmark(null)}
              className="mb-4 flex items-center gap-1 text-sm text-gray-500"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <h1 className="text-2xl font-bold mb-2">{selectedArticle.title}</h1>
            <p className="text-sm text-gray-500 mb-4">
              {selectedArticle.category}
            </p>

            <img
              src={selectedArticle.imageUrl}
              alt={selectedArticle.title}
              className="w-full max-h-64 object-cover rounded mb-4"
            />

            <p className="mb-4">{selectedArticle.content}</p>

          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>Select a bookmark to view the article</p>
            <Play className="w-10 h-10 mx-auto mt-4 text-gray-400" />
          </div>
        )}
      </div>

      {/* BottomNavbar - visible only on mobile */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNavbar isDarkMode={darkMode} toggleDarkMode={toggleDarkMode} activeTab="bookmark" />
      </div>
    </div>
  );
};

export default Bookmark;
