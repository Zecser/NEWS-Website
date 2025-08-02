// src/api/admin.js
import axios from "axios";
import { baseURL } from "./axios";

const API = axios.create({
  baseURL,
  withCredentials: true,
});

export const loginAdmin = (credentials) => API.post("admin/login", credentials);

export const logoutAdmin = () => API.post("admin/logout");

export const getAdminProfile = () => API.get("/admin/profile", { withCredentials: true }); // Optional if you implement this on backend

export const getAllArticles = (data) => API.get("/admin/articles", data);

export const deleteArticle = (id) => API.delete(`/admin/articles/${id}`);

export const createArticle = (data) => {
  const formData = new FormData();

  for (let key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  }

  return API.post("/admin/articles", formData);
};


export const getArticleById = (id) => API.get(`admin/articles/${id}`);

export const updateArticle = (id, data) => API.put(`admin/articles/${id}`, data);

export default API;