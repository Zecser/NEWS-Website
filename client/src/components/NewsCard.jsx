import { Heart } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../api/axios";

const NewsCard = ({
  id,
  image,
  title,
  author,
  date,
  description,
  content,
  likes,
  isDarkMode,
  userId,
  isInitiallyBookmarked = false,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(isInitiallyBookmarked);
  const [showFullArticle, setShowFullArticle] = useState(false);

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
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <img src={image} alt={title} className="w-full h-60 object-cover" />

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-400">{author} | {date}</p>

        {!showFullArticle ? (
          <>
            <p className="text-sm">{description}</p>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleBookmark}
                  className={`transition-all duration-200 ${
                    isBookmarked ? "text-red-500" : "text-gray-400"
                  } hover:scale-110`}
                >
                  <Heart size={16} fill={isBookmarked ? "currentColor" : "none"} />
                </button>
                <span className="text-xs text-gray-400">{likes || 0}</span>
              </div>

              <button
                onClick={() => setShowFullArticle(true)}
                className="text-orange-500 text-xs font-semibold hover:text-orange-600"
              >
                Read More
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm">{description}</p>
            <div className="border-t border-gray-600 my-2"></div>
            <p className="text-sm whitespace-pre-line">{content}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowFullArticle(false)}
                className="text-sm text-gray-400 hover:underline"
              >
                ← Back
              </button>
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleBookmark}
                  className={`transition-all duration-200 ${
                    isBookmarked ? "text-red-500" : "text-gray-400"
                  } hover:scale-110`}
                >
                  <Heart size={16} fill={isBookmarked ? "currentColor" : "none"} />
                </button>
                <span className="text-xs text-gray-400">{likes || 0}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
