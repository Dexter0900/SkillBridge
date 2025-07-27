import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Layouts
import MainLayout from '../components/layouts/MainLayout';
import DashboardLayout from '../components/layouts/DashboardLayout';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import StudentDashboard from '../pages/StudentDashboard';
import EmployerDashboard from '../pages/EmployerDashboard';
import AdminPanel from '../pages/AdminPanel';
import BrowseGigs from '../pages/BrowseGigs';
import GigDetails from '../pages/GigDetails';
import PublicProfile from '../pages/PublicProfile';
import Messages from '../pages/Messages';
import NotFound from '../pages/NotFound';

// Protected Route Component
import ProtectedRoute from '../components/ui/ProtectedRoute';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/browse-gigs" element={<BrowseGigs />} />
        <Route path="/gigs/:id" element={<GigDetails />} />
        <Route path="/profile/:id" element={<PublicProfile />} />
      </Route>

      {/* Protected Student Routes */}
      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/messages" element={<Messages />} />
        </Route>
      </Route>

      {/* Protected Employer Routes */}
      <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/messages" element={<Messages />} />
        </Route>
      </Route>

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin-panel" element={<AdminPanel />} />
        </Route>
      </Route>

      {/* Redirect based on user role */}
      <Route
        path="/dashboard"
        element={
          user ? (
            user.role === 'student' ? (
              <Navigate to="/student-dashboard" replace />
            ) : user.role === 'employer' ? (
              <Navigate to="/employer-dashboard" replace />
            ) : user.role === 'admin' ? (
              <Navigate to="/admin-panel" replace />
            ) : (
              <Navigate to="/" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;