
const Loader = ({ isDarkMode = false, size = 8 }) => {
  return (
    <div className="flex items-center justify-center py-6">
      <div
        className={`
          animate-spin rounded-full 
          border-4 border-t-transparent 
          ${isDarkMode ? "border-gray-500" : "border-gray-300"}
          h-${size} w-${size}
        `}
        style={{ borderTopColor: "#f97316" }} // orange-500
      />
    </div>
  );
};

export default Loader;
