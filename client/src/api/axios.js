import axios from "axios";

export const baseURL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL,
  withCredentials: true,
});

// Attach token automatically if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

export default API;
