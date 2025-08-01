import { useState, useEffect } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { logoutAdmin, getAllArticles, deleteArticle } from "../../api/admin";
import Sidebar from "../../components/SideBar";
import NewsCard from "../../components/NewsCard";
import { FaTrashAlt, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const News = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab] = useState("home");
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { admin } = useAdminAuth();

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      navigate("/admin/login");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await getAllArticles();
        setArticles(data || []);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedArticleId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteArticle(selectedArticleId);
      setArticles((prev) => prev.filter((a) => a._id !== selectedArticleId));
      toast.success("Article deleted successfully!");
    } catch (err) {
      console.error("Error deleting article:", err);
      toast.error("Failed to delete article");
    } finally {
      setShowDeleteModal(false);
      setSelectedArticleId(null);
    }
  };

  // Filtered articles based on search
  const filteredArticles = articles.filter((article) => {
    const lowerSearch = search.toLowerCase();
    return (
      article.title.toLowerCase().includes(lowerSearch) ||
      (article.category && article.category.toLowerCase().includes(lowerSearch))
    );
  });

  return (
    <div
      className={`flex h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <Sidebar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        activeTab={activeTab}
        userId={admin?._id}
        isAdmin={!!admin}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto relative">
        <h2 className="text-2xl font-bold mb-4">News Articles</h2>

        <input
          type="text"
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`mb-6 p-2 w-full max-w-md rounded shadow-sm border ${
            isDarkMode
              ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400"
              : "bg-white text-black border-gray-300"
          }`}
        />

        {loading ? (
          <div className="text-center text-gray-500">Loading articles...</div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div key={article._id} className="relative group">
                <NewsCard
                  id={article._id}
                  userId={admin?._id}
                  image={
                    article.imageUrl ||
                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1470&q=80"
                  }
                  title={article.title}
                  author={article.tag || "Unknown Author"}
                  date={new Date(article.createdAt).toLocaleDateString()}
                  description={article.caption}
                  likes={article.likes || 0}
                  isDarkMode={isDarkMode}
                />
                <button
                  onClick={() => handleDeleteClick(article._id)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition-opacity opacity-0 group-hover:opacity-100"
                >
                  <FaTrashAlt />
                </button>
                <button
                  onClick={() => navigate(`/admin/edit-article/${article._id}`)}
                  className="absolute top-2 right-10 text-blue-600 hover:text-blue-800 transition-opacity opacity-0 group-hover:opacity-100"
                >
                  ✏️
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No articles found.</p>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div
              className={`${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              } p-6 rounded shadow-lg max-w-sm w-full text-center`}
            >
              <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Confirm Deletion</h3>
              <p className="mb-4">
                Are you sure you want to delete this article?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
