import { generateToken } from "../config/generateToken.js";
import Article from "../models/articleModel.js";
import Bookmark from "../models/bookmarkModel.js";
import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import {sendResetEmail} from "../utils/nodeMailer.js"
import dotenv from "dotenv";
dotenv.config();

const client = new OAuth2Client(process.env.CLIENT_ID);

//user login and register
export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("All fields are required");
    }
    console.log(name, email, password);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({message:"User already exists"});
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.log("error in registerUser", error.message);
    res.status(500).send(error.message);
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    generateToken(res, user, "User logged in successfully");
  } catch (error) {
    console.log("error in login", error.message);
    res.status(500).json({ message: "login server error" });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { email, name, picture } = req.body;

    if (!email || !name || !picture) {
      return res.status(400).json({ message: "Email is required" });
    }

    console.log(email, name, picture);

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: email + process.env.JWT_SECRET, // random hash-based password
        imageUrl: picture,
        googleAuth: true,
      });
    }

    const token = generateToken(res, user, "Google login successful");
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "googleLogin server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,       // required in production with HTTPS
      sameSite: "none",   // must match original cookie
      expires: new Date(0), // expire immediately
    });
      res.json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "logout server error" });
  }
};

//articles controller:

export const getArticles = async (req, res) => {
  try {
    const { category, country, state, district, date, search, tag } = req.query;

    // Build dynamic query object
    let query = {};

    if (category) query.category = category;
    if (country) query.country = country;
    if (state) query.state = state;
    if (district) query.district = district;
    if (tag) query.tag = tag;
    if (date) {
      // Match articles created on the specific date (ignoring time)
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      query.createdAt = { $gte: start, $lt: end };
    }

    // Search by title, caption, or textarea (case-insensitive)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { caption: { $regex: search, $options: "i" } },
        { textarea: { $regex: search, $options: "i" } },
      ];
    }

    // Fetch latest articles first
    const articles = await Article.find(query).sort({ createdAt: -1 });

    res.status(200).json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getSingleArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.status(200).json(article);
  } catch (error) {
    console.log("error in getSingleArticle", error.message);
    res.status(500).send(error.message);
  }
};

//bookmark controller:

export const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.params.id }).populate(
      "articleId"
    );
    if (!bookmarks) {
      return res.status(404).json({ message: "No bookmarks found" });
    }
    res.status(200).json(bookmarks);
  } catch (error) {
    console.log("error in getBookmarks", error.message);
    res.status(500).send(error.message);
  }
};

export const addBookmark = async (req, res) => {
  const { userId, articleId } = req.body;

  if (!userId || !articleId) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    // Check if bookmark already exists
    const existing = await Bookmark.findOne({ userId, articleId });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Already bookmarked" });
    }

    const newBookmark = await Bookmark.create({ userId, articleId });

    res.status(201).json({ success: true, bookmark: newBookmark });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBookmark = async (req, res) => {
  try {
    const deleted = await Bookmark.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Bookmark not found" });
    }
    res.status(200).json({ success: true, message: "Bookmark deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addcreatepost = async (req, res) => {
  const { title, category, country, state, district, textarea, tag, caption } =
    req.body;

  let newsImg = "";

  if (req.file?.filename) {
    newsImg = req.file.filename;
  }
  if (!title || !category || !country || !state || !district || !caption) {
    return res.status(400).json({ error: "All fields are required" });
  }

  console.log(
    title,
    category,
    country,
    state,
    district,
    tag,
    caption,
    textarea
  );

  try {
    const existingProject = await Article.findOne({ title });
    if (existingProject) {
      return res.status(406).json("News item already exists");
    }

    const newProject = new Article({
      title,
      category,
      country,
      state,
      district,
      tag,
      caption,
      textarea,
      imageUrl: newsImg,
    });

    await newProject.save();
    return res.status(200).json(newProject);
  } catch (err) {
    console.error("Error saving project:", err);
    return res.status(500).json({ error: err.message });
  }
};


export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password");
    if (!req.id) {
      return res.status(404).json({ message: "User not found, id too " });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const editUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, phone } = req.body;
  console.log(name, email, phone);

  try {
    const updatedFields = { name, email, phone };

    // If a new image is uploaded
    if (req.file && req.file.filename) {
      updatedFields.imageUrl = req.file.path; // Only public_id
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    console.log(token);
    console.log(process.env.FRONTEND_URL);

     const link = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await sendResetEmail(email, link);

     res.json({ success: true, message: "Reset email sent successfully.", token } );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    if (!token || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id); // Use "id", not "userId", as that's what you signed in token

    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = newPassword; // This will be hashed automatically
    await user.save(); // Triggers pre-save hook

    res.json({ success: true, message: "Password reset successful." });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Invalid or expired token" });
  }
};

export const getNotification = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({
      createdAt: -1,
    })
    if (!notifications) {
      return res.status(404).json({ message: "No notifications found" });
    }
    res.status(200).json(notifications);
  } catch (error) {
    console.log("error in getNotification", error.message);
    res.status(500).send(error.message);
  }
};

// controllers/userController.js
export const toggleNotifications = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(req.body);
    const { enabled } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { notificationsEnabled: enabled },
      { new: true }
    );

    user.save();

    res.status(200).json({ message: "Notifications updated", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update notifications" });
  }
};


