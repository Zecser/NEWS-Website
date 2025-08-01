// src/api/admin.js
import axios from "axios";
import { baseURL } from "./axios";

const API = axios.create({
  baseURL,
  withCredentials: true,
});

export const loginAdmin = (credentials) => API.post("/login", credentials);

export const logoutAdmin = () => API.post("/logout");

export const getAdminProfile = () => API.get("/profile", { withCredentials: true }); // Optional if you implement this on backend

export const getAllArticles = (data) => API.get("/articles", data);

export const deleteArticle = (id) => API.delete(`/articles/${id}`);

export const createArticle = (data) => {
  const formData = new FormData();

  for (let key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  }

  return API.post("/articles", formData);
};


export const getArticleById = (id) => API.get(`/articles/${id}`);

export const updateArticle = (id, data) => API.put(`/articles/${id}`, data);

export default API;