import { useEffect, useState } from "react";
import { ChevronDown, Mic, Filter } from "lucide-react";
import SideBar from "../../components/SideBar";
import NewsCard from "../../components/NewsCard";
import Accordion from "../../components/Accordion";
import BottomNavbar from "../../components/BottomNavbar";
import axios from "axios";

const categories = ["Latest", "Sports", "Politics", "Business", "Health"];

function SearchPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    location: "",
    date: "",
    language: "",
  });

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/articles");
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

  const handleFilterSelect = (type, value) => {
    setSelectedFilters((prev) => ({ ...prev, [type]: value }));
  };

  const filteredArticles = articles.filter((article) => {
    const matchesQuery =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.caption.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory
      ? article.category?.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    const matchesLocation = selectedFilters.location
      ? article.state?.toLowerCase() === selectedFilters.location.toLowerCase()
      : true;

    const matchesLanguage = selectedFilters.language
      ? article.language?.toLowerCase() ===
        selectedFilters.language.toLowerCase()
      : true;

    const matchesDate = (() => {
      if (!selectedFilters.date) return true;
      const createdDate = new Date(article.createdAt);
      const now = new Date();

      switch (selectedFilters.date) {
        case "Today":
          return createdDate.toDateString() === now.toDateString();
        case "Last 7 Days":
          return createdDate >= new Date(now - 7 * 24 * 60 * 60 * 1000);
        case "This Month":
          return (
            createdDate.getMonth() === now.getMonth() &&
            createdDate.getFullYear() === now.getFullYear()
          );
        case "This Year":
          return createdDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    })();

    return (
      matchesQuery &&
      matchesCategory &&
      matchesLocation &&
      matchesLanguage &&
      matchesDate
    );
  });

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row transition-colors duration-300 ${
        isDarkMode ? "bg-[#121212] text-white" : "bg-gray-50 text-black"
      }`}
    >
      <SideBar
        activeTab="search"
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <div className="flex-1 overflow-y-auto pb-24 md:pb-10">
        <h1 className="text-center text-xl font-semibold mt-4">Search</h1>

        {/* Search input */}
        <div
          className={`flex items-center gap-2 mx-4 mt-6 rounded-full border px-4 py-2 shadow-sm ${
            isDarkMode ? "bg-gray-800" : ""
          }`}
        >
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <Mic className="w-5 h-5 text-gray-500" />
        </div>

        {/* Categories and filter toggle */}
        <div className="flex items-center gap-3 mt-4 px-4 overflow-x-auto">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="bg-orange-500 text-white rounded-full p-2"
          >
            <Filter className="w-4 h-4" />
          </button>

          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`border rounded-full px-4 py-1 text-sm ${
                selectedCategory === cat
                  ? "bg-orange-500 text-white"
                  : isDarkMode
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter dropdowns */}
        {filterOpen && (
          <div className="bg-orange-500 text-white rounded-md px-4 py-3 mx-4 mt-2 space-y-3 w-64 shadow-lg text-sm">
            <Accordion
              title="Location"
              items={[
                "Kerala",
                "Tamil Nadu",
                "Delhi",
                "Maharashtra",
                "Karnataka",
              ]}
              onSelect={handleFilterSelect}
            />
            <Accordion
              title="Date"
              items={["Today", "Last 7 Days", "This Month", "This Year"]}
              onSelect={handleFilterSelect}
            />
            <Accordion
              title="Language"
              items={[
                "English",
                "Malayalam",
                "Hindi",
                "Kannada",
                "Gujarati",
                "Tamil",
                "Telugu",
                "Others",
              ]}
              onSelect={handleFilterSelect}
            />
          </div>
        )}

        {/* Articles */}
        <div className="mt-6 space-y-6 px-4">
          {loading && <p>Loading articles...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && filteredArticles.length === 0 && (
            <p className="text-gray-500">No articles match your filters.</p>
          )}

          {filteredArticles.map((article) => (
            <NewsCard
              key={article._id}
              id={article._id}
              userId={article.userId}
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
              onReadMore={() => {}}
            />
          ))}
        </div>
      </div>

      {/* Bottom Nav for small screens */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-10">
        <BottomNavbar
          activeTab="search"
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}

export default SearchPage;
