import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location]);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Browse Gigs', path: '/browse-gigs' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-500">SkillBridge</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.title}
                to={link.path}
                className={({ isActive }) =>
                  `text-base font-medium transition-colors ${
                    isActive
                      ? 'text-primary-500'
                      : isScrolled
                      ? 'text-gray-800 hover:text-primary-500'
                      : 'text-gray-800 hover:text-primary-500'
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Auth Buttons or User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={user.avatar || 'https://via.placeholder.com/40'}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary-500"
                  />
                  <span className="font-medium text-gray-800">{user.name}</span>
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to={`/profile/${user.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/messages"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Messages
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.title}
                to={link.path}
                className={({ isActive }) =>
                  `block py-2 text-base font-medium ${
                    isActive ? 'text-primary-500' : 'text-gray-800 hover:text-primary-500'
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}

            {user ? (
              <>
                <div className="py-2 border-t border-gray-200 mt-2">
                  <div className="flex items-center space-x-3 py-2">
                    <img
                      src={user.avatar || 'https://via.placeholder.com/40'}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary-500"
                    />
                    <span className="font-medium text-gray-800">{user.name}</span>
                  </div>
                  <Link
                    to="/dashboard"
                    className="flex items-center py-2 text-base font-medium text-gray-800 hover:text-primary-500"
                  >
                    <FiUser className="mr-2" /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center py-2 text-base font-medium text-gray-800 hover:text-primary-500 w-full text-left"
                  >
                    <FiLogOut className="mr-2" /> Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2 py-3 border-t border-gray-200 mt-2">
                <Link to="/login">
                  <Button variant="outline" fullWidth>
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button fullWidth>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;