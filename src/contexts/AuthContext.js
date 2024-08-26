// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [token, setToken] = useState('test-token'); 

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  //   if (storedToken) {
  //     setIsLoggedIn(true);
  //     setToken(storedToken);
  //   }
  // }, []);

  const login = (token) => {
    setIsLoggedIn(true);
    setToken(token);
    // localStorage.setItem('token', token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    // localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
