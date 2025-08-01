import { Routes, Route } from "react-router-dom";
import AdminLogin from "../../pages/admin/AdminLogin";
import News from "../../pages/admin/News";
import AdminProtectedRoute from "../../components/AdminProtectedRoute";
import EditArticle from "../../pages/admin/EditArticle";
import AdminCreatePost from "../../pages/admin/CreatePost";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="login" element={<AdminLogin />} />

      {/* Protected routes */}
      <Route
        path="news"
        element={
          <AdminProtectedRoute>
            <News />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="users"
        element={
          <AdminProtectedRoute>
            <News />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="create-post"
        element={
          <AdminProtectedRoute>
           <AdminCreatePost/>
          </AdminProtectedRoute>
        }
      />

      <Route
        path="edit-article/:id"
        element={
          <AdminProtectedRoute>
           <EditArticle/>
          </AdminProtectedRoute>
        }
      />
      

    </Routes>
  );
};

export default AdminRoutes;
