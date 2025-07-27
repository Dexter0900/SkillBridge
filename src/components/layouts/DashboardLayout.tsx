import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FiHome, 
  FiUser, 
  FiBriefcase, 
  FiMessageSquare, 
  FiSettings, 
  FiLogOut,
  FiMenu,
  FiX,
  FiUsers,
  FiBarChart2
} from 'react-icons/fi';
import Button from '../ui/Button';
import clsx from 'clsx';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define navigation items based on user role
  const navigationItems = [
    // Common items for all roles
    {
      name: 'Dashboard',
      icon: <FiHome className="w-5 h-5" />,
      href: user?.role === 'student' 
        ? '/student-dashboard' 
        : user?.role === 'employer' 
          ? '/employer-dashboard' 
          : '/admin-panel',
      roles: ['student', 'employer', 'admin']
    },
    {
      name: 'Messages',
      icon: <FiMessageSquare className="w-5 h-5" />,
      href: '/messages',
      roles: ['student', 'employer']
    },
    // Student-specific items
    {
      name: 'My Profile',
      icon: <FiUser className="w-5 h-5" />,
      href: `/profile/${user?.id}`,
      roles: ['student']
    },
    {
      name: 'Browse Gigs',
      icon: <FiBriefcase className="w-5 h-5" />,
      href: '/browse-gigs',
      roles: ['student']
    },
    // Employer-specific items
    {
      name: 'My Gigs',
      icon: <FiBriefcase className="w-5 h-5" />,
      href: '/employer-dashboard/gigs',
      roles: ['employer']
    },
    {
      name: 'Post a Gig',
      icon: <FiUser className="w-5 h-5" />,
      href: '/employer-dashboard/post-gig',
      roles: ['employer']
    },
    // Admin-specific items
    {
      name: 'Users',
      icon: <FiUsers className="w-5 h-5" />,
      href: '/admin-panel/users',
      roles: ['admin']
    },
    {
      name: 'Gigs',
      icon: <FiBriefcase className="w-5 h-5" />,
      href: '/admin-panel/gigs',
      roles: ['admin']
    },
    {
      name: 'Analytics',
      icon: <FiBarChart2 className="w-5 h-5" />,
      href: '/admin-panel/analytics',
      roles: ['admin']
    },
    // Settings for all roles
    {
      name: 'Settings',
      icon: <FiSettings className="w-5 h-5" />,
      href: '/settings',
      roles: ['student', 'employer', 'admin']
    },
  ];

  // Filter navigation items based on user role
  const filteredNavItems = navigationItems.filter(
    item => user && item.roles.includes(user.role)
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={clsx(
          "fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 py-5 border-b">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary-500">SkillBridge</span>
            </div>
            <button 
              className="p-1 rounded-md lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* User info */}
          <div className="flex items-center px-4 py-5 border-b">
            <img 
              src={user?.avatar || 'https://via.placeholder.com/40'} 
              alt={user?.name} 
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {filteredNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => clsx(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t">
            <Button
              variant="outline"
              fullWidth
              leftIcon={<FiLogOut className="w-5 h-5" />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-4 lg:px-6">
            <button
              className="p-1 text-gray-600 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">
                {user?.role === 'student' 
                  ? 'Student Dashboard' 
                  : user?.role === 'employer' 
                    ? 'Employer Dashboard' 
                    : 'Admin Panel'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <NavLink to="/messages" className="text-gray-600 hover:text-gray-900">
                <FiMessageSquare className="w-6 h-6" />
              </NavLink>
              <NavLink to={`/profile/${user?.id}`} className="text-gray-600 hover:text-gray-900">
                <img 
                  src={user?.avatar || 'https://via.placeholder.com/40'} 
                  alt={user?.name} 
                  className="w-8 h-8 rounded-full"
                />
              </NavLink>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;