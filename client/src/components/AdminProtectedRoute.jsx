import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const AdminProtectedRoute = ({ children }) => {
  const { admin, loading } = useAdminAuth();

  if (loading) return <div>Checking admin...</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;

  return children;
};

export default AdminProtectedRoute;
