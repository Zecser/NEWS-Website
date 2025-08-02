import { Heart } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../api/axios";

const NewsCard = ({
  id, // This is the articleId
  image,
  title,
  author,
  date,
  description,
  likes,
  onReadMore,
  isDarkMode,
  userId, // Pass userId as prop if user is logged in
  isInitiallyBookmarked = false,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(isInitiallyBookmarked);

  const handleBookmark = async () => {
    if (!userId) {
      toast.error("Please login to bookmark articles.");
      return;
    }

    try {
      await axios.post(`${baseURL}/bookmarks`, {
        userId,
        articleId: id,
      });

      toast.success("Article bookmarked successfully!");
      setIsBookmarked(true);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      if (error.response?.status === 400 && errorMsg === "Already bookmarked") {
        toast.error("This article is already bookmarked.");
      } else {
        toast.error(errorMsg);
      }
      console.error("Bookmark error:", errorMsg);
    }
  };

  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3
          className={`font-semibold text-sm mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-xs mb-2 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {author} | {date}
        </p>
        <p
          className={`text-xs mb-3 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <button
              onClick={handleBookmark}
              className={`
      transition-all duration-200
      ${
        isBookmarked
          ? "text-red-500"
          : isDarkMode
          ? "text-gray-400"
          : "text-gray-600"
      }
      hover:scale-110 hover:text-red-400
    `}
            >
              <Heart size={16} fill={isBookmarked ? "currentColor" : "none"} />
            </button>
            <span
              className={`text-xs ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {30}
            </span>
          </div>

          <button
            onClick={onReadMore}
            className="text-orange-500 text-xs font-semibold hover:text-orange-600"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
