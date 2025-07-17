import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">SkillBridge</h3>
            <p className="text-gray-400 mb-4">
              Connecting talented students with employers for freelance opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse-gigs" className="text-gray-400 hover:text-white transition-colors">
                  Browse Gigs
                </Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/#testimonials" className="text-gray-400 hover:text-white transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students & Employers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Users</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/student-dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/employer-dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Employer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-400 hover:text-white transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/forgot-password" className="text-gray-400 hover:text-white transition-colors">
                  Forgot Password
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-gray-400">
                  123 Innovation Street, Tech City, CA 94043, USA
                </span>
              </li>
              <li className="flex items-center">
                <FiPhone className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FiMail className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-gray-400">info@skillbridge.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SkillBridge. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;