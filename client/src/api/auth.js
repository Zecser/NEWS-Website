import API from "./axios";

export const registerUser = (userData) => API.post("/register", userData);
export const loginUser = (userData) => API.post("/login", userData);
export const logoutUser = () => API.post("/logout");
export const getUserProfile = () => API.get("/user/me");

export const forgotPasswordAPI = (email) =>
  API.post("forgot-password", { email });

export const resetPasswordAPI = (token, newPassword) =>
  API.post(`/reset-password/:token`, { token, newPassword });
