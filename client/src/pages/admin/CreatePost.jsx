import { useState } from "react";
import { Plus } from "lucide-react";
import { createArticle } from "../../api/admin";
import { toast } from "react-toastify";
import Sidebar from "../../components/SideBar";

function AdminCreatePost({ isDarkMode, toggleDarkMode, userId, handleLogout }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       console.log(title, category, caption, country, state, district, language, likes, status, image);
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
      });

     
      toast.success("Post created successfully!");
      // Optionally reset form here
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
      className={`flex min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Sidebar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        activeTab="create-post"
        userId={userId}
        isAdmin={true}
        handleLogout={handleLogout}
      />

      <main className="flex-1 px-6 py-8 ml-10">
        <h2
          className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
            isDarkMode ? "text-orange-400" : "text-orange-500"
          }`}
        >
          <Plus /> Create New Post
        </h2>

        <form
          onSubmit={handleSubmit}
          className={`p-6 rounded-xl shadow-lg max-w-3xl space-y-5 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Inputs */}
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              className={inputClass}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter title"
            />
          </div>

          <div>
            <label className={labelClass}>Category</label>
            <input
              type="text"
              className={inputClass}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              placeholder="Enter category"
            />
          </div>

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
            <label className={labelClass}>Country</label>
            <input
              type="text"
              className={inputClass}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              placeholder="Enter Country"
            />
          </div>

          <div>
            <label className={labelClass}>State</label>
            <input
              type="text"
              className={inputClass}
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              placeholder="Enter State"
            />
          </div>

          <div>
            <label className={labelClass}>District</label>
            <input
              type="text"
              className={inputClass}
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
              placeholder="Enter District"
            />
          </div>

          <div>
            <label className={labelClass}>Language</label>
            <input
              type="text"
              className={inputClass}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
              placeholder="Enter Language"
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
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Publish Post
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AdminCreatePost;
