import React, { createContext, useContext, useState, useEffect } from "react";
import { apiService } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const data = await apiService.getMe(token);
      setUser(data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const data = await apiService.login(email, password);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    }
    return { success: false, error: data.error };
  };

  const register = async (username, email, password) => {
    const data = await apiService.register(username, email, password);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    }
    return { success: false, error: data.error };
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
