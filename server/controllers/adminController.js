import { generateToken } from "../config/generateToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const admin = await User.findOne({ email, isAdmin: true });

    if (!admin)
      return res
        .status(401)
        .json({ message: "Admin not found or not authorized" });

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    console.log("fine till here");

    generateToken(res, admin, "Admin logged in successfully");

    // return res.status(200).json({ message: "Admin logged in successfully" });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ message: "Internal server error" });
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

export const getAdminProfile = async (req, res) => {
  return res.status(200).json({ message: "Admin profile", admin: req.admin });
};
