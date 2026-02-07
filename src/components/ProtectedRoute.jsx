import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    // If user's role is not in the allowed roles, redirect to home page
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
