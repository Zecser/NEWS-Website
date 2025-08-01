import API from "./axios";


// ✅ Update user info (with image upload)
export const editUser = (id, userData) =>
  API.put(`/users/${id}`, userData, {
    headers: { "Content-Type": "multipart/form-data" }, // important for multer
  });
