import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Politics",
        "Business",
        "Health",
        "Sports",
        "International",
        "Entertainment",
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
        "Science",
        "Crime",
        "Weather",
        "Lifestyle",
        "Travel",
        "Food",
        "Fashion",
        "Finance",
        "Real Estate",
        "Science",
        "Crime",
        "Military",
      ], // You can add more categories or make it dynamic
    },
    caption: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      // required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "India", // Optional, can be blank if not applicable
    },
    state: {
      type: String,
    },
    district: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now, // Automatically store published date
    },
    language: {
      type: String,
      required: true,
      enum: ["English", "Hindi", "Malayalam", "Tamil"], // Add languages you support
      default: "English",
    },
    likes: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
    videoUrl: {
      type: String,
    },
    locality: {
      type: String,
      // required: true
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt fields automatically
);

export default mongoose.model("Article", articleSchema);
