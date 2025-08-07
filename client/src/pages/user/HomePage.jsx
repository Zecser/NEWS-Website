import { useState, useEffect } from "react";
import axios from "axios";
import { Bell, Sun, Moon } from "lucide-react";
import NewsCard from "../../components/NewsCard";
import BottomNavbar from "../../components/BottomNavbar";
import Sidebar from "../../components/SideBar";
import { getUserProfile } from "../../api/auth";
import { baseURL } from "../../api/axios";
import Loader from "../../components/Loader";

const categories = [
  "All",
  "Politics",
  "Business",
  "Health",
  "Sports",
  "International",
  "Entertainment",
  "Science",
  "Technology",
  "Environment",
  "Education",
  "Crime",
  "Weather",
  "Lifestyle",
  "Travel",
  "Food",
  "Fashion",
  "Finance",
  "Real Estate",
  "World",
  "History",
  "Art & Culture",
  "Automobile",
  "Agriculture",
  "Space",
  "Military & Defense",
  "Religion",
  "Opinion & Editorials",
  "Economy",
  "Stock Market",
  "Innovation",
  "Startups",
  "Health & Fitness",
  "Parenting",
  "Books & Literature",
];

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  // ✅ Fetch articles from backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${baseURL}/articles`);
        setArticles(res.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserProfile(); // 👉 Fetch user from /user/me
        setUserId(data._id); // assuming your backend sends { _id, name, ... }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleReadMore = (id) => {
    alert(`Read More Clicked! Article ID: ${id}`);
  };

  const handleNavigate = (tab) => setActiveTab(tab);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // ✅ Filter articles by category
  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  if (loading) return <Loader isDarkMode={isDarkMode} size={10} />;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row w-full ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900 "
      }`}
    >
      {/* ✅ Left Sidebar (Desktop Only) */}
      <div className="hidden w-200 lg:block h-screen sticky top-0 ">
        <Sidebar
          isDarkMode={isDarkMode}
          activeTab={activeTab}
          onNavigate={handleNavigate}
          toggleDarkMode={toggleDarkMode}
          userId={userId}
        />
      </div>
      {/* ✅ Main Content */}A
      <div className="flex flex-col overflow-hidden">
        {/* ✅ Header */}
        <header
          className={`lg:hidden flex items-center justify-between px-4 sm:px-6 py-3 shadow-sm ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h1 className="text-lg sm:text-xl font-bold">Logo</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Bell
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } cursor-pointer hover:opacity-80`}
              size={20}
            />
          </div>
        </header>

        {/* ✅ Categories */}
        <section className="mb-4 mt-4">
          <h2 className="font-bold text-lg sm:text-xl lg:text-2xl mb-3 px-4 sm:px-6 lg:px-8 ">
            Categories
          </h2>
          <div className="flex gap-2 sm:gap-3  overflow-x-scroll px-4 sm:px-6 lg:px-8 py-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white shadow-md"
                    : isDarkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ✅ News Cards (Dynamic) */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-8">
          {filteredArticles.length === 0 ? (
            <p>No articles available in this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {filteredArticles.map((article) => (
                <NewsCard
                  key={article._id}
                  id={article._id}
                  userId={userId}
                  media={[article?.imageUrl, article?.videoUrl]}
                  // image={
                  //   article.imageUrl ||
                  //   "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  // }
                  title={article.title}
                  author={article.tag || "Unknown Author"}
                  date={new Date(article.createdAt).toLocaleDateString()}
                  description={article.caption}
                  content={article.content}
                  likes={article.likes || 0}
                  onReadMore={() => handleReadMore(article._id)}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          )}
        </main>

        {/* ✅ Bottom Navigation */}
        <div className="lg:hidden">
          <BottomNavbar
            isDarkMode={isDarkMode}
            isAdmin={false}
            activeTab={activeTab}
            onNavigate={handleNavigate}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
