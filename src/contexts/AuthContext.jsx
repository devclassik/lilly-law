// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem("token");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      if (storedToken && storedRefreshToken) {
        setIsAuthenticated(true);
        setToken(storedToken);
        setRefreshToken(storedRefreshToken);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (accessToken, refreshToken) => {
    setIsAuthenticated(true);
    setToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // console.log("Logged in:", { accessToken, refreshToken });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  // console.log("AuthContext state:", {
  //   isAuthenticated,
  //   token,
  //   refreshToken,
  //   loading,
  // });

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, token, refreshToken, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
