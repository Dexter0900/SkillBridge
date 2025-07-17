import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '../../context/AuthContext';
import Loader from './Loader';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loader while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="large" />
      </div>
    );
  }

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If allowedRoles is empty, allow any authenticated user
  if (allowedRoles.length === 0) {
    return <Outlet />;
  }

  // If user role is not in allowedRoles, redirect to appropriate dashboard
  if (!allowedRoles.includes(user.role)) {
    if (user.role === 'student') {
      return <Navigate to="/student-dashboard" replace />;
    } else if (user.role === 'employer') {
      return <Navigate to="/employer-dashboard" replace />;
    } else if (user.role === 'admin') {
      return <Navigate to="/admin-panel" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // If user role is allowed, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;