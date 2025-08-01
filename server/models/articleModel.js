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
      ], // You can add more categories or make it dynamic
    },
    caption: {
      type: String,
      trim: true,
    },
    // content: {
    //   type: String,
    //   required: true,
    // },
    imageUrl: {
      type: String,
      // required: true, // If every article must have an image
      default: "https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D",
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
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User", // Reference to Admin who posted it
    //   required: true,
    // },
  },
  { timestamps: true } // Adds createdAt & updatedAt fields automatically
);

export default mongoose.model("Article", articleSchema);
