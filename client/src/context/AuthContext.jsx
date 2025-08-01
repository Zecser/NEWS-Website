/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import { logoutUser, getUserProfile } from "../api/auth";
import { useLocation } from "react-router-dom"; // Import this

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // 👈 current route

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserProfile();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // ✅ Skip fetching user if route starts with /admin
    if (!location.pathname.startsWith("/admin")) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  const login = async () => {
    try {
      const { data } = await getUserProfile(); // Fetch from backend after cookie is set
      setUser(data);
    } catch {
      setUser(null);
    }
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  if (loading) return <div>Loading...</div>; // Optional spinner

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
