import { useState } from "react";
import { Plus } from "lucide-react";
import { createArticle } from "../../api/admin";
import { toast } from "react-toastify";
import Sidebar from "../../components/SideBar";
import BottomNavbar from "../../components/BottomNavbar";
import { useNavigate } from "react-router-dom";

function AdminCreatePost({ userId, handleLogout }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [caption, setCaption] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [language, setLanguage] = useState("");
  const [likes, setLikes] = useState(0);
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [video, setVideo] = useState(null);
  const [locality, setLocality] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createArticle({
        title,
        category,
        caption,
        country,
        state,
        district,
        language,
        likes,
        status,
        image,
        content,
        video,
        locality,
      });

      toast.success("Post created successfully!");
      navigate("/admin/news");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const inputClass =
    "w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 " +
    (isDarkMode
      ? "bg-gray-700 text-white placeholder-gray-400 focus:ring-orange-500"
      : "bg-gray-100 text-gray-800 placeholder-gray-600 focus:ring-orange-500");

  const labelClass = "block mb-2 font-medium";

  const selectClass =
    "w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 " +
    (isDarkMode
      ? "bg-gray-700 text-white border-gray-600 focus:ring-orange-500"
      : "bg-white text-black border-gray-300 focus:ring-orange-500");

  const fileInputClass =
    "block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold " +
    (isDarkMode
      ? "text-gray-300 file:bg-orange-100 file:text-orange-800 hover:file:bg-orange-200"
      : "text-gray-600 file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100");

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar - visible on md+ */}
      <div className="hidden md:block">
        <Sidebar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          activeTab="create-post"
          userId={userId}
          isAdmin={true}
          handleLogout={handleLogout}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
        <h2
          className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
            isDarkMode ? "text-orange-400" : "text-orange-500"
          }`}
        >
          <Plus /> Create New Post
        </h2>

        <form
          onSubmit={handleSubmit}
          className={`p-6 rounded-xl shadow-lg max-w-3xl mx-auto space-y-5 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Form fields */}
          {[
            { label: "Title", value: title, setter: setTitle },
            { label: "Category", value: category, setter: setCategory },
            { label: "Country", value: country, setter: setCountry },
            { label: "State", value: state, setter: setState },
            { label: "District", value: district, setter: setDistrict },
            { label: "Language", value: language, setter: setLanguage },
            { label: "Locality", value: locality, setter: setLocality },
          ].map(({ label, value, setter }) => (
            <div key={label}>
              <label className={labelClass}>{label}</label>
              <input
                type="text"
                className={inputClass}
                value={value}
                onChange={(e) => setter(e.target.value)}
                required
                placeholder={`Enter ${label}`}
              />
            </div>
          ))}

          <div>
            <label className={labelClass}>Caption</label>
            <textarea
              className={inputClass + " resize-none h-24"}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
              placeholder="Write your article caption here..."
            />
          </div>

          <div>
            <label className={labelClass}>Content</label>
            <textarea
              className={inputClass + " resize-none h-40"}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Write the full content here..."
            />
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select
              name="status"
              value={status}
              onChange={handleChange}
              className={selectClass}
              required
            >
              <option value="">Select status</option>
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              className={fileInputClass}
              onChange={handleImageChange}
            />
            {image && (
              <p
                className={`mt-2 text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Selected: <span className="font-medium">{image.name}</span>
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Upload Video (optional)</label>
            <input
              type="file"
              accept="video/*"
              className={fileInputClass}
              onChange={handleVideoChange}
            />
            {video && (
              <p
                className={`mt-2 text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Selected: <span className="font-medium">{video.name}</span>
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors w-full"
            >
              Publish Post
            </button>
          </div>
        </form>
      </main>

      {/* BottomNavbar - visible on small screens only */}
      <div className="fixed bottom-0 left-0 w-full block md:hidden z-50">
        <BottomNavbar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          activeTab="create-post"
          userId={userId}
          isAdmin={true}
          handleLogout={handleLogout}
        />
      </div>
    </div>
  );
}

export default AdminCreatePost;
