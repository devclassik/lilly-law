import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (storedToken && storedRefreshToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
      setRefreshToken(storedRefreshToken);
    }
  }, []);

  const login = (token, refreshToken) => {
    setIsLoggedIn(true);
    setToken(token);
    setRefreshToken(refreshToken);
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};
