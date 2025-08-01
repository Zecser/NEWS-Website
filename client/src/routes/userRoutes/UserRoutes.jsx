import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/user/HomePage";
import Bookmark from "../../pages/user/Bookmark";
import Notification from "../../pages/user/Notification";
import LandingPage from "../../pages/user/LandingPage";
import Login from "../../pages/user/Login";
import Register from "../../pages/user/Register";
import Edituser from "../../pages/user/EditUser";
import ProtectedRoute from "../../components/ProtectedRoute";

const UserRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<HomePage />} /> {/* ✅ Guest can access */}

      {/* Protected Routes (requires login) */}
      <Route
        path="/bookmarks"
        element={
          <ProtectedRoute>
            <Bookmark />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:userId"
        element={
          <ProtectedRoute>
            <Edituser />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default UserRoutes;
