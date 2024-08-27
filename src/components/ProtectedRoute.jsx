import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from './loadingScreen';

const ProtectedRoute = ({ children }) => {
  // const { isLoggedIn } = useAuth();
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />; // Show loading state
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
