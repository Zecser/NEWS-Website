import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // or just 'bcrypt' if you're using that

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
   notificationsEnabled: {
    type: Boolean,
    default: true, // default to true
  },
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bookmark",
    },
  ],
  imageUrl: String,
  phone: Number,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Hash password before save (only if password is modified)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("User", userSchema);
