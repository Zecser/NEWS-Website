import jwt from "jsonwebtoken";

export const generateToken = (res, user, message, role) => {
  const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });


  return res
    .status(200)
    .cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //1day
      httpOnly: true,
      // sameSite: "strict",
       secure: process.env.NODE_ENV === "production"
    })
    .json({ success: true, message, user });
};