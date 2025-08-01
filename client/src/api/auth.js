import API from "./axios";

export const registerUser = (userData) => API.post("/register", userData);
export const loginUser = (userData) => API.post("/login", userData);
export const logoutUser = () => API.post("/logout");
export const getUserProfile = () => API.get("/user/me");
