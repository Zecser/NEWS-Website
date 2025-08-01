import axios from "axios";

export const baseURL = import.meta.env.VITE_API_URL || 'https://news-website-4xw6.onrender.com';


const API = axios.create({
  baseURL:`${baseURL}/api`,
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
