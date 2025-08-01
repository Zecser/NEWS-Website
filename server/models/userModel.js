import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bookmark" // Reference to News Model
    }
  ],
  imageUrl: String,
  phone: Number,
  isAdmin:{
    type: Boolean,
    default: false
  }
});

export default mongoose.model("User", userSchema);