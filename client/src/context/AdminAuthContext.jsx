/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { loginAdmin, logoutAdmin, getAdminProfile } from "../api/admin";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/auth";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await getAdminProfile();
        setAdmin(data.admin);
        setLoading(false);
      
      } catch (error) {
        console.error(error);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    if (location.pathname.startsWith("/admin")) {
      fetchAdmin();
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  const handleLogin = async (email, password) => {
    try {
      const { data } = await getUserProfile();
      setAdmin(data.admin);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      setAdmin(null);
      navigate("/admin/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ admin,setAdmin, loading, handleLogin, handleLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
