import React, { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "../pages/dashboard/hooks/useUser";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const { getAllData } = useUser();

  useEffect(() => {
    const checkAuth = () => {
      const authData = getAllData("ar");

      if (authData?.access && authData?.refresh) {
        setIsAuthenticated(true);
        setToken(authData.access);
        setRefreshToken(authData.refresh);
      } else {
        setIsAuthenticated(false);
        setToken(null);
        setRefreshToken(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, [getAllData]);

  const login = (accessToken, refreshToken) => {
    setIsAuthenticated(true);
    setToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem("ar");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, token, refreshToken, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
